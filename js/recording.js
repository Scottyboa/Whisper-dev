// js/recording.js
// ——— Global low-latency pipeline & routing ———
let audioContext     = null;
let workletNode      = null;
let audioRingBuffer  = [];
let activeSession    = null;

// Send a PCM chunk to whichever session is active
function sendAudioChunk(pcm16) {
  if (!activeSession) return;
  const bytes = new Uint8Array(pcm16.buffer);
  let bin = "";
  for (let b of bytes) bin += String.fromCharCode(b);
  const b64 = btoa(bin);
  const msg = { type: "input_audio_buffer.append", audio: b64 };
  activeSession.ws.send(JSON.stringify(msg));
}

// One-time init of AudioWorklet pipeline, inlined via Blob
async function initAudioPipeline() {
  if (audioContext) return;
  audioContext = new AudioContext({ sampleRate: 24000 });
  const workletCode = `
    class PCMProcessor extends AudioWorkletProcessor {
      process(inputs) {
        const in0 = inputs[0][0];
        if (in0) {
          const pcm = new Int16Array(in0.length);
          for (let i = 0; i < in0.length; i++) {
            const s = Math.max(-1, Math.min(1, in0[i]));
            pcm[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
          }
          this.port.postMessage(pcm);
        }
        return true;
      }
    }
    registerProcessor('pcm-processor', PCMProcessor);
  `;
  const blob = new Blob([workletCode], { type: 'application/javascript' });
  const url  = URL.createObjectURL(blob);
  await audioContext.audioWorklet.addModule(url);
  workletNode = new AudioWorkletNode(audioContext, 'pcm-processor');
  workletNode.port.onmessage = e => {
    const chunk = e.data;
    sendAudioChunk(chunk);
    audioRingBuffer.push(chunk);
    if (audioRingBuffer.length > 200) audioRingBuffer.shift();
  };
}
// --- Session class for Realtime Transcription ---
// ——— WebSocket-based fallback for firewalled networks ———
class WebSocketSession {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.ws = null;
  }

  async startTranscription(stream, sessionConfig) {
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
  // route incoming PCM to *this* session
  activeSession = this;

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
let overlapTimer   = null;
let nextSession    = null

// ─── Schedule the next rollover based on measured handshake ───────────────
function scheduleRollover() {
  const delay = Math.max(
    0,
    ROLLOVER_BASE_MS - handshakeMs - HANDSHAKE_SAFETY_MS
  );
  rolloverTimer = setTimeout(doRollover, delay);
}

// ─── Perform a parallel‐stream session swap ───────────────────────────────
async function doRollover() {
  // 1) Spin up the next session in background
  const apiKey = sessionStorage.getItem("user_api_key");
  nextSession = new WebSocketSession(apiKey);
  nextSession.onmessage = handleMessage;
  nextSession.onerror   = handleError;

  // Prepare to measure its handshake too
  handshakeStart = performance.now();
  handshakeMs    = null;

  // Start sending audio to the new session
  await nextSession.startTranscription(mediaStream, sessionConfig);
  // — flush any buffered PCM into the new session —
  audioRingBuffer.forEach(chunk => {
    activeSession = nextSession;
    sendAudioChunk(chunk);
  });
  audioRingBuffer = [];

  // 2) After OVERLAP_DURATION_MS, retire the old session
  overlapTimer = setTimeout(() => {
  session.stop();
  session = nextSession;
  activeSession = session;
    nextSession = null;
    // when this new session emits "transcription_session.created",
    // scheduleRollover() will fire again for the next cycle.
  }, OVERLAP_DURATION_MS);
}

function updateVADConfig(silenceMs) {
  if (!sessionConfig) return;
  sessionConfig.turn_detection.silence_duration_ms = silenceMs;
  const msg = { type: "transcription_session.update", session: sessionConfig };
  // Broadcast to both sessions during overlap
  [session, nextSession].forEach(s => {
    if (!s) return;
    if (s.ws?.readyState === WebSocket.OPEN) {
      s.ws.send(JSON.stringify(msg));
    } else if (typeof s.sendMessage === "function") {
      s.sendMessage(msg);
    }
  });
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
    // hook mic into worklet
  const src = audioContext.createMediaStreamSource(mediaStream);
  src.connect(workletNode);

   // 2) Re-use your start() helper to re-open websocket & resume transcription
   try {
     await start(stream);
   } catch (err) {
     alert("Connection error: " + err.message);
    teardownSession();
  // ensure shared pipeline
  await initAudioPipeline();
     updateUI('stopped');
   }
 }

// 4B) Pause logic (now also detects Resume)
function handlePauseClick() {
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
  // Clear any pending VAD‐update timers
  clearTimeout(minChunkTimer);
  clearTimeout(maxChunkTimer);
  clearTimeout(rolloverTimer);
  clearTimeout(overlapTimer);
  minChunkTimer = null;
  maxChunkTimer = null;

 // 1) Stop & clear any session
  if (session) {
    session.stop();
    session = null;
  }
  // 2) Stop & clear microphone
  if (mediaStream) {
    mediaStream.getTracks().forEach(t => t.stop());
    mediaStream = null;
  }
  // 3) Reset any in-flight flags
  isStopping = false;
  isPausing  = false;
  // 4) Restore Pause button to its default label
  pauseBtn.textContent = "Pause Recording";
}

// --- Step 2: Enhanced Start Logic ---
async function startMicrophone() {
  // Clicking START at any time resets everything
    teardownSession();
  // ensure shared pipeline
  await initAudioPipeline();
  transcriptEl.value = "";           // clear old transcript
  updateUI('resuming');              // disable all buttons

  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (err) {
    alert("Microphone error: " + err.message);
    updateUI('idle');
    return;
  }
  mediaStream = stream;
  // hook mic into worklet
  const src = audioContext.createMediaStreamSource(mediaStream);
  src.connect(workletNode);
  await start(stream);
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
    clearTimeout(overlapTimer);

    await session.startTranscription(stream, sessionConfig);
    activeSession = session;
    // Once mic + websocket are fully active:
    updateUI('recording');         // enable Stop & Pause

  } catch (err) {
    alert("Connection error: " + err.message);
    teardownSession();
    updateUI('idle');
  }
}

function handleStopClick() {
  // ── Scenario 2: user clicked Stop while paused (Resume button showing) ──
  if (pauseBtn.textContent === "Resume Recording") {
    // No extra teardown needed (already disconnected on Pause)
    // Reset UI to Idle/Stopped
    pauseBtn.textContent = "Pause Recording";
    updateUI('stopped');
    return;
  }

  // ── Scenario 1: user clicked Stop during active recording/resume ──
  isStopping = true;
  // Immediately flip UI into the “Stopped” state:
  // Start enabled; Stop & Pause disabled
  updateUI('stopped');

  // Check VAD to see if we need to commit a final chunk
    // Decide by whether transcript ends in "..." or "***"
  const endsWithDelta    = /\.{3}$/.test(transcriptEl.value);
  const endsWithComplete = /\*{3}$/.test(transcriptEl.value);

  if (!endsWithDelta && !endsWithComplete) {
    // Scenario A: no pending chunk at end → immediate teardown
    mediaStream.getTracks().forEach(t => t.stop());
    mediaStream = null;
    session.stop();
    session = null;
    isStopping = false;
  } else {
    // Scenario B: chunk pending at end → commit then delayed mic stop
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
    statusEl.textContent = "Stopping…";
    // Final teardown & UI reset happen in your handleMessage() isStopping branch
  }
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
