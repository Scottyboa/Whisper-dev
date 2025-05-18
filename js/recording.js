// js/recording.js

 // ─ Shared AudioWorklet Pipeline for Zero-Gap Rollover ─
 const RING_BUFFER_MAX_CHUNKS = Math.ceil(2000 / (512/48000*1000)); // ~2 s @ 48 kHz
 let ringBuffer = [];            // holds base64 PCM frames
 let activeSession = null;
 let audioCtx, workletNode, mediaStream;

 // 1) Inline PCM worklet code via Blob
 const pcmWorkletCode = `
   class PCMProcessor extends AudioWorkletProcessor {
     process(inputs) {
       const inBuf = inputs[0][0];
       if (!inBuf) return true;
       const pcm16 = new Int16Array(inBuf.length);
       for (let i = 0; i < inBuf.length; i++) {
         const s = Math.max(-1, Math.min(1, inBuf[i]));
         pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
       }
       this.port.postMessage(pcm16);
       return true;
     }
   }
   registerProcessor('pcm-processor', PCMProcessor);
 `;

 // 2) Initialize AudioContext + Worklet
 (async function initAudioPipeline() {
   audioCtx = new AudioContext({ sampleRate: 48000 });
   const blob = new Blob([pcmWorkletCode], { type: 'application/javascript' });
   await audioCtx.audioWorklet.addModule(URL.createObjectURL(blob));
   workletNode = new AudioWorkletNode(audioCtx, 'pcm-processor', {
     processorOptions: { bufferSize: 512 }
   });
   workletNode.port.onmessage = evt => {
     const pcm16 = evt.data;
     const b64 = btoa(String.fromCharCode(...new Uint8Array(pcm16.buffer)));
     // maintain ring buffer
     ringBuffer.push(b64);
     if (ringBuffer.length > RING_BUFFER_MAX_CHUNKS) ringBuffer.shift();
     // live-send to active session
     if (activeSession?.ws?.readyState === WebSocket.OPEN) {
       activeSession.ws.send(JSON.stringify({
         type: "input_audio_buffer.append",
         audio: b64
       }));
     }
   };
 })();

 // Switch sessions and replay buffered audio
 function setActiveSession(session) {
   activeSession = session;
   if (session?.ws?.readyState === WebSocket.OPEN) {
     for (let frame of ringBuffer) {
       session.ws.send(JSON.stringify({
         type: "input_audio_buffer.append",
         audio: frame
       }));
     }
   }
 }

 // Start/stop mic → worklet
 async function startCapture() {
   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
   const src = audioCtx.createMediaStreamSource(stream);
   src.connect(workletNode);
   workletNode.connect(audioCtx.destination);
   return stream;
 }
 function stopCapture(stream) {
   stream.getTracks().forEach(t => t.stop());
 }
 // ─ End pipeline setup ─

// --- Session class for Realtime Transcription ---
// ——— WebSocket-based fallback for firewalled networks ———
class WebSocketSession {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.ws = null;
  }

  async startTranscription(stream, sessionConfig, autoStream = true) {
    const url = "wss://api.openai.com/v1/realtime?intent=transcription";
    this.ws = new WebSocket(url, [
      "realtime",
      `openai-insecure-api-key.${this.apiKey}`,
      "openai-beta.realtime-v1"
    ]);
    this.ws.binaryType = "arraybuffer";

    this.ws.onopen = () => {
   console.log("WS> onopen → sending transcription_session.update");
  // ✅ correct WS event for transcription
  this.ws.send(JSON.stringify({
    type: "transcription_session.update",
    session: sessionConfig
  }));

      // only replay + attach mic if we’re actually “live”
      if (autoStream) {
        // replay buffered frames (≈2 s)…
        for (let frame of ringBuffer) {
          this.ws.send(JSON.stringify({
            type: "input_audio_buffer.append",
            audio: frame
          }));
        }

        // and now hook up the live mic → server
        this.attachMediaStream(stream);
      }
// ————————————————————————————————————————
};


    this.ws.onmessage = evt => {
      let data = (typeof evt.data === "string")
        ? JSON.parse(evt.data)
        : { audio: evt.data };
      this.onmessage?.(data);
    };
    this.ws.onerror = err => this.onerror?.(err);
  }

   /**
    * Attach a live MediaStream to this.ws,
    * encoding + sending PCM chunks exactly as before.
    */
   attachMediaStream(stream) {
     const audioCtx = new AudioContext({ sampleRate: 24000 });
     const source   = audioCtx.createMediaStreamSource(stream);
     const proc     = audioCtx.createScriptProcessor(4096, 1, 1);
     source.connect(proc);
     proc.connect(audioCtx.destination);

     proc.onaudioprocess = (evt) => {
       // 1) Float32 → Int16 → base64
       const float32 = evt.inputBuffer.getChannelData(0);
       const pcm16   = new Int16Array(float32.length);
       for (let i = 0; i < float32.length; i++) {
         const s = Math.max(-1, Math.min(1, float32[i]));
         pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
       }
       const bytes = new Uint8Array(pcm16.buffer);
       let binary = "";
       for (let b of bytes) binary += String.fromCharCode(b);
       const b64 = btoa(binary);

       // 2) Buffer & send
       ringBuffer.push(b64);
       if (ringBuffer.length > RING_BUFFER_MAX_CHUNKS) ringBuffer.shift();
       if (this.ws.readyState === WebSocket.OPEN) {
         this.ws.send(JSON.stringify({
           type: "input_audio_buffer.append",
           audio: b64
         }));
       }
     };
   }

  // ─── allow the same sendMessage(...) calls as the RTC Session class
  sendMessage(message) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }
  stop() {
    this.ws?.close();
  }
}
// ——————————————————————————————————————————————


class Session {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.useSessionToken = true;
    this.ms = null;
    this.pc = null;
    this.dc = null;
    this.muted = false;
  }

  async start(stream, sessionConfig) {
    await this.startInternal(stream, sessionConfig, "/v1/realtime/sessions");
  }

  async startTranscription(stream, sessionConfig) {
    await this.startInternal(stream, sessionConfig, "/v1/realtime/transcription_sessions");
  }

  stop() {
    this.dc?.close();
    this.dc = null;
    this.pc?.close();
    this.pc = null;
    this.ms?.getTracks().forEach(t => t.stop());
    this.ms = null;
    this.muted = false;
  }

  mute(muted) {
    this.muted = muted;
    this.pc?.getSenders().forEach(sender => {
      if (sender.track) sender.track.enabled = !muted;
    });
  }

  async startInternal(stream, sessionConfig, tokenEndpoint) {
    this.ms = stream;
    this.pc = new RTCPeerConnection();
    this.pc.ontrack = e => this.ontrack?.(e);
    this.pc.onconnectionstatechange = () => this.onconnectionstatechange?.(this.pc.connectionState);

    this.dc = this.pc.createDataChannel("");
    this.dc.onopen = e => this.onopen?.(e);
    this.dc.onmessage = e => {
      try {
        const parsed = JSON.parse(e.data);
        this.onmessage?.(parsed);
      } catch (err) {
        console.error("Invalid message", err);
      }
    };

    this.pc.addTrack(stream.getTracks()[0], stream);

    const offer = await this.pc.createOffer();
    await this.pc.setLocalDescription(offer);

    try {
      const answer = await this.signal(offer, sessionConfig, tokenEndpoint);
      await this.pc.setRemoteDescription(answer);
    } catch (e) {
      this.onerror?.(e);
      throw e;
    }
  }

  async signal(offer, sessionConfig, tokenEndpoint) {
    const urlRoot = "https://api.openai.com";
    const realtimeUrl = `${urlRoot}/v1/realtime`;
    let sdpResponse;

    if (this.useSessionToken) {
      const sessionUrl = `${urlRoot}${tokenEndpoint}`;
      const sessionResponse = await fetch(sessionUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "openai-beta": "realtime-v1",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sessionConfig)
      });
      if (!sessionResponse.ok) throw new Error("Failed to request session token");
      const sessionData = await sessionResponse.json();
      const clientSecret = sessionData.client_secret.value;

      sdpResponse = await fetch(realtimeUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${clientSecret}`,
          "Content-Type": "application/sdp"
        },
        body: offer.sdp
      });
      if (!sdpResponse.ok) throw new Error("Failed to signal");
    } else {
      const formData = new FormData();
      formData.append("session", JSON.stringify(sessionConfig));
      formData.append("sdp", offer.sdp);

      sdpResponse = await fetch(realtimeUrl, {
        method: "POST",
        headers: { Authorization: `Bearer ${this.apiKey}` },
        body: formData
      });
      if (!sdpResponse.ok) throw new Error("Failed to signal");
    }

    const answerSdp = await sdpResponse.text();
    return { type: "answer", sdp: answerSdp };
  }

  sendMessage(message) {
    this.dc.send(JSON.stringify(message));
  }
}

// --- UI & Control Logic ---
const APP_PREFIX        = "realtime/transcribe/";
const MODEL = "gpt-4o-transcribe";
const TURN_DETECTION_TYPE = "server_vad";
const MIN_CHUNK_DURATION_MS    = 10 * 1000;      // 10 seconds
const MAX_CHUNK_DURATION_MS    = 2  * 60 * 1000; // 2 minutes
const DEFAULT_SILENCE_DURATION_MS   = 2000;      // 2 seconds
const AGGRESSIVE_SILENCE_DURATION_MS = 200;       // 200 ms

// ─── Helper to push a new VAD config … (etc) …

// ─── Rollover session constants & state ───────────────────────────────────
const SESSION_MAX_MS      = 10  * 60 * 1000;  // 10 min hard cap
const ROLLOVER_BASE_MS    =  1  * 60 * 1000;  // start overlap at 8 min
const HANDSHAKE_SAFETY_MS =        2000;     // 2 s buffer margin
const OVERLAP_DURATION_MS =        2000;     // 2 s parallel stream

// Rollover state
let handshakeStart = null;
let handshakeMs    = null;
let rolloverTimer  = null;
// ─── New state for pre-handshake & swap ─────────────────────────────
let handshakeTimer = null;    // to kick off the “warm” session early
let newSession     = null;    // placeholder for our soon-to-be-live session

// ─── Helper: wait for a specific WS event (e.g. commit-completed) ────
function waitForEvent(ws, eventType) {
  return new Promise(resolve => {
    const listener = messageEvent => {
      const evt = JSON.parse(messageEvent.data);
      if (evt.type === eventType) {
        ws.removeEventListener('message', listener);
        resolve(evt);
      }
    };
    ws.addEventListener('message', listener);
  });
}

// ─── Ring buffer for the last ~2 s of raw PCM frames ─────────────────────
// 4096 samples @24 kHz ≈ 0.17 s per chunk
// → buffer ≈30 chunks for ~5 s (covers safety + overlap + jitter)
const RING_BUFFER_MAX_CHUNKS = Math.ceil(5000 / (4096/24000*1000));
let ringBuffer = [];


// ─── Recording-timer state & helpers ─────────────────────────────────────
let recordTimerInterval = null;
let recordStartTime     = null;
let recordElapsedMs     = 0;
const recordTimerElem   = document.getElementById("recordTimer");  // :contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}

function formatTimeFull(ms) {
  const totalSec = Math.floor(ms/1000);
  const hours    = Math.floor(totalSec/3600);
  const mins     = Math.floor((totalSec % 3600)/60);
  const secs     = totalSec % 60;
  let parts = [];
  if (hours) parts.push(hours + " hour" + (hours>1?"s":""));
  if (mins  || hours) parts.push(mins  + " min"  + (mins!==1?"s":""));
  parts.push(secs + " sec");
  return parts.join(" ");
}

function updateRecordTimer() {
  const elapsed = recordElapsedMs + (Date.now() - recordStartTime);
  recordTimerElem.textContent = "Recording Timer: " + formatTimeFull(elapsed);
}

function startRecordTimer(reset = false) {
  if (reset) recordElapsedMs = 0;
  recordStartTime = Date.now();
  clearInterval(recordTimerInterval);
  updateRecordTimer();
  recordTimerInterval = setInterval(updateRecordTimer, 1000);
}

function stopRecordTimer() {
  clearInterval(recordTimerInterval);
 if (recordStartTime) {
    recordElapsedMs += Date.now() - recordStartTime;
    recordStartTime = null;
  }
}



// ─── Schedule the next rollover based on measured handshake ───────────────
function scheduleRollover() {
  // 1️⃣  Start the “warm” session a little early (no audio yet)
  const preStartDelay = Math.max(
    0,
    ROLLOVER_BASE_MS
    - handshakeMs
    - HANDSHAKE_SAFETY_MS
    - OVERLAP_DURATION_MS
  );
  handshakeTimer = setTimeout(() => {
    const apiKey = sessionStorage.getItem("user_api_key");
    newSession = new WebSocketSession(apiKey);
    newSession.onmessage = handleMessage;
    newSession.onerror   = handleError;
    // handshake + session.update, but no audio until swap
    newSession.startTranscription(mediaStream, sessionConfig, false);
  }, preStartDelay);

  // 2️⃣  Schedule the actual swap at the 8 min mark
  const delay = Math.max(
    0,
    ROLLOVER_BASE_MS - handshakeMs - HANDSHAKE_SAFETY_MS
  );
  rolloverTimer = setTimeout(doRollover, delay);
}

// ─── Perform a parallel‐stream session swap ───────────────────────────────
 async function doRollover() {
   // Pre-handshake of newSession must be done elsewhere...
   await waitForEvent(newSession.ws, 'open');
   // 1) Replay & switch live to newSession
   setActiveSession(newSession);
   // 2) Tear down old WS
   session.stop();
   session = newSession;
   newSession = null;
   handshakeStart = performance.now();
   scheduleRollover();
 }

function updateVADConfig(silenceMs) {
  if (!sessionConfig) return;
  sessionConfig.turn_detection.silence_duration_ms = silenceMs;
  const msg = { type: "transcription_session.update", session: sessionConfig };
  // Send only to the active session
  if (session.ws?.readyState === WebSocket.OPEN) {
    session.ws.send(JSON.stringify(msg));
  } else {
    session.sendMessage(msg);
  }
}

 const transcriptEl      = document.getElementById("transcription");
 const startMicBtn       = document.getElementById("startButton");
 const stopBtn           = document.getElementById("stopButton");
 const pauseBtn          = document.getElementById("pauseResumeButton");
 const statusEl          = document.getElementById("statusMessage");



let session = null;
let sessionConfig = null;
let vadTime = 0;
let isStopping = false;
let mediaStream    = null; 
let minChunkTimer = null;
let maxChunkTimer = null;


// Possible states: 'idle', 'recording', 'paused', 'resuming', 'stopped'
function updateUI(state) {
  // Clear any status message on state change
  statusEl.textContent = "";

  // Default: disable all, then enable the ones we want
  startMicBtn.disabled  = true;
  stopBtn.disabled      = true;
  pauseBtn.disabled     = true;

  switch(state) {
    case 'idle':
      startMicBtn.disabled = false;
      // stop & pause remain disabled
      break;

    case 'recording':
      // Start greyed out
      stopBtn.disabled  = false;
      pauseBtn.disabled = false;
      break;

    case 'paused':
      startMicBtn.disabled = true;
      // Stop stays enabled so user can finish or restart
      stopBtn.disabled      = false;
      // pauseBtn will have become the "Resume" button
      pauseBtn.disabled     = false;
      break;

    case 'resuming':
      // during reconnect, prevent any button clicks
      break;

    case 'stopped':
      startMicBtn.disabled = false;
      // stop & pause stay disabled
      break;
  }
}

function initState() {
  updateUI('idle');

  startMicBtn.addEventListener("click", startMicrophone);
  pauseBtn.addEventListener("click", handlePauseClick);
  stopBtn .addEventListener("click", handleStopClick);
}

// Track that we’re in the process of pausing
let isPausing = false;

// 4A) Resume logic
 async function handleResumeClick() {
   // Flip back to Pause, show loading UI
   pauseBtn.textContent = "Pause Recording";
   updateUI('resuming');

   // 1) Get mic stream
   let stream;
   try {
     stream = await navigator.mediaDevices.getUserMedia({ audio: true });
   } catch (err) {
     alert("Microphone error: " + err.message);
     updateUI('idle');
     return;
   }
   mediaStream = stream;

   // 2) Re-use your start() helper to re-open websocket & resume transcription
   try {
     await start(stream);
     // resume timer (preserves past elapsed)
    startRecordTimer(false);
   } catch (err) {
     alert("Connection error: " + err.message);
     teardownSession();
     updateUI('stopped');
   }
 }

// 4B) Pause logic (now also detects Resume)
function handlePauseClick() {
  // stop UI timer on Pause
  stopRecordTimer();

  // If already paused, delegate to Resume
  if (pauseBtn.textContent === "Resume Recording") {
    return handleResumeClick();
  }
  if (!session) return;

  // Begin Pause
  pauseBtn.disabled = true;
  isPausing = true;

    // Decide by whether transcript ends in "..." or "***"
  const endsWithDelta    = /\.{3}$/.test(transcriptEl.value);
  const endsWithComplete = /\*{3}$/.test(transcriptEl.value);

  if (!endsWithDelta && !endsWithComplete) {
    // Scenario A: nothing pending → immediate teardown
    mediaStream.getTracks().forEach(t => t.stop());
    mediaStream = null;
    session.stop();
    session = null;

    pauseBtn.textContent = "Resume Recording";
    updateUI('paused');
    isPausing = false;
  } else {
    // Scenario B: pending chunk → commit then delayed mic stop
    const commitEvt = { type: "input_audio_buffer.commit" };
    if (session.ws?.readyState === WebSocket.OPEN) {
      session.ws.send(JSON.stringify(commitEvt));
    } else {
      session.sendMessage(commitEvt);
    }
    setTimeout(() => {
       mediaStream.getTracks().forEach(t => t.stop());
       mediaStream = null;
    }, 1000);
    statusEl.textContent = "Pausing…";
    // final transcript will trigger the rest in handleMessage()
  }
}



// --- New teardown helper to reset any existing session/microphone ---
 function teardownSession() {
   clearAllTimers();
   session?.stop();
   session = null;
   if (mediaStream) {
     stopCapture(mediaStream);
     mediaStream = null;
   }
   pauseBtn.textContent = "Pause Recording";
   updateUI('idle');
 }

// --- Step 2: Enhanced Start Logic ---
 async function startMicrophone() {
   teardownSession();
   updateUI('resuming');
   // 1) Hook mic → shared worklet pipeline
   mediaStream = await startCapture();
   // 2) Start a new transcription WS session
   await startSession(mediaStream);
   // 3) Route live & buffered audio
   setActiveSession(session);
   startRecordTimer(true);
 }

async function start(stream) {
  // Retrieve API key
  const apiKey = sessionStorage.getItem("user_api_key");
  if (!apiKey) {
    alert("Missing API key—please re-enter it on the home page.");
    teardownSession();
    updateUI('idle');
    return;
  }

  // Instantiate a fresh session
  const USE_WEBSOCKETS = true;
  session = USE_WEBSOCKETS
    ? new WebSocketSession(apiKey)
    : new Session(apiKey);

  session.onmessage = handleMessage;
  session.onerror   = handleError;

  // Configure transcription
  sessionConfig = {
    input_audio_transcription: { model: MODEL },
        turn_detection: {
      type: TURN_DETECTION_TYPE,
      threshold: 0.4,
      prefix_padding_ms: 400,
      // initial high threshold to block VAD for first 10 s
      silence_duration_ms: MIN_CHUNK_DURATION_MS
    }
  };

  try {
   // ─── Begin handshake timer & clear any prior rollover ───────────────
    handshakeStart = performance.now();
    handshakeMs    = null;
    clearTimeout(rolloverTimer);

    await session.startTranscription(stream, sessionConfig);
    // Once mic + websocket are fully active:
    updateUI('recording');         // enable Stop & Pause

  } catch (err) {
    alert("Connection error: " + err.message);
    teardownSession();
    updateUI('idle');
  }
}

 function handleStopClick() {
   stopRecordTimer();
   isStopping = true;
   updateUI('stopped');
   session.ws.send(JSON.stringify({ type: "input_audio_buffer.commit" }));
   teardownSession();
 }

 

function handleMessage(parsed) {
  console.log("🛰 WS event:", parsed);
  switch (parsed.type) {
     case "transcription_session.created":
      // don’t overwrite our config; measure handshake & schedule rollover
      if (handshakeStart !== null && handshakeMs === null) {
        handshakeMs = performance.now() - handshakeStart;
        scheduleRollover();
      }
      break;
    case "input_audio_buffer.speech_started":
      // user just started speaking: show “…” placeholder
      transcriptEl.value += "...";

      // ─── Reset and start our per‐chunk timers ─────────────────────────
      clearTimeout(minChunkTimer);
      clearTimeout(maxChunkTimer);

      // 1) Block VAD until minimum chunk length (10 s of silence required)
      updateVADConfig(MIN_CHUNK_DURATION_MS);

      // 2) After 10 s, revert to normal 2 s‐silence cutoff
      minChunkTimer = setTimeout(
        () => updateVADConfig(DEFAULT_SILENCE_DURATION_MS),
        MIN_CHUNK_DURATION_MS
      );

      // 3) Failsafe: after 2 min total, force aggressive 200 ms cutoff
      maxChunkTimer = setTimeout(
        () => updateVADConfig(AGGRESSIVE_SILENCE_DURATION_MS),
        MAX_CHUNK_DURATION_MS
      );

      break;
    case "input_audio_buffer.speech_stopped":
  // VAD detected end-of-speech: turn “…” into “***”
  transcriptEl.value = transcriptEl.value.replace(/\.{3}(?!.*\.{3})/, "***");
   vadTime = performance.now() - (sessionConfig.turn_detection.silence_duration_ms || 0);
   break;
    case "conversation.item.input_audio_transcription.delta":
      // Optionally show partial delta
      break;
      case "conversation.item.input_audio_transcription.completed":
  // 1) Append the incoming transcript chunk
  if (/\*{3}(?!.*\*{3})/.test(transcriptEl.value)) {
    transcriptEl.value = transcriptEl.value.replace(/\*{3}(?!.*\*{3})/, parsed.transcript);
  } else {
    transcriptEl.value += parsed.transcript;
  }
  transcriptEl.value += " ";

  // 2) If we’re pausing, finish pause teardown
  if (isPausing) {
    isPausing = false;
    session.stop();
    session = null;

    pauseBtn.textContent = "Resume Recording";
    updateUI('paused');
    statusEl.textContent = "";
  }
  // 3) Else if we’re stopping, finish stop teardown
  else if (isStopping) {
    isStopping = false;
    session.stop();
    session = null;

    pauseBtn.textContent = "Pause Recording";
    updateUI('stopped');
    statusEl.textContent = "Ready to start again.";
  }
  break;


  }
}

function handleTranscript({ transcript, partial }) {
  // simply append each final chunk with a space
  transcriptEl.value += transcript;
  if (!partial) transcriptEl.value += ' ';
  transcriptEl.scrollTop = transcriptEl.scrollHeight;
}

function handleError(e) {
  console.error(e);
  handleStopClick(); 
}

// Export the initialization function to be called from main.js
export function initRecording() {
  initState();
}
