// js/recording.js

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

// ——— Raw PCM @24 kHz capture via AudioContext ———
const audioCtx = new AudioContext({ sampleRate: 24000 });
const source   = audioCtx.createMediaStreamSource(stream);
const proc     = audioCtx.createScriptProcessor(4096, 1, 1);
source.connect(proc);
proc.connect(audioCtx.destination);

proc.onaudioprocess = (evt) => {
  // 1) Float32 → Int16
  const float32 = evt.inputBuffer.getChannelData(0);
  const pcm16   = new Int16Array(float32.length);
  for (let i = 0; i < float32.length; i++) {
    const s = Math.max(-1, Math.min(1, float32[i]));
    pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }
  // 2) Base64‐encode
  const bytes  = new Uint8Array(pcm16.buffer);
  let binary   = "";
  for (let b of bytes) binary += String.fromCharCode(b);
  const b64    = btoa(binary);
  // 3) Send as append event
  if (this.ws.readyState === WebSocket.OPEN) {
    this.ws.send(JSON.stringify({
      type: "input_audio_buffer.append",
      audio: b64
    }));
  }
};
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
 const transcriptEl      = document.getElementById("transcription");
 const startMicBtn       = document.getElementById("startButton");
 const stopBtn           = document.getElementById("stopButton");
 const pauseBtn          = document.getElementById("pauseResumeButton");
 const statusEl          = document.getElementById("statusMessage");



const MIN_CHUNK_MS         = 10_000;   // 10 s lock-in before any cutoff
const DEFAULT_SILENCE_MS   = 2_000;    // 2 s normal VAD threshold
const MAX_CHUNK_MS         = 120_000;  // 2 min hard-stop window
const MAX_CHUNK_SILENCE_MS =   200;    // 200 ms VAD after max chunk

// — Timers to control when we update server VAD settings:
let minChunkTimer = null;
let maxChunkTimer = null;

function updateVADConfig(newSilenceMs) {
  const newConfig = {
    input_audio_transcription: sessionConfig.input_audio_transcription,
    turn_detection: {
      type:               TURN_DETECTION_TYPE,
      threshold:          sessionConfig.turn_detection.threshold,
      prefix_padding_ms:  sessionConfig.turn_detection.prefix_padding_ms,
      silence_duration_ms: newSilenceMs
    }
  };
  const msg = { type: "transcription_session.update", session: newConfig };
  if (session.ws?.readyState === WebSocket.OPEN) {
    session.ws.send(JSON.stringify(msg));
  } else {
    session.sendMessage(msg);
  }
  sessionConfig = newConfig;
}

let session           = null;
let sessionConfig     = null;
let vadTime           = 0;
let isStopping        = false;
let mediaStream       = null;

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
   } catch (err) {
     alert("Connection error: " + err.message);
     teardownSession();
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
     // hold off on VAD until at least 10 s lock-in + 2 s normal silence
      silence_duration_ms: MIN_CHUNK_MS + DEFAULT_SILENCE_MS
    }
  };

  try {
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
      sessionConfig = parsed.session;
      break;
    case "input_audio_buffer.speech_started":
  // user just started speaking: show “…” placeholder
  transcriptEl.value += "...";
  // ── Reset any old timers ──
  clearTimeout(minChunkTimer);
  clearTimeout(maxChunkTimer);

  // After 10 s, restore normal 2 s VAD
  minChunkTimer = setTimeout(() => {
    updateVADConfig(DEFAULT_SILENCE_MS);
  }, MIN_CHUNK_MS);

  // But if 2 min elapse, force a 200 ms cutoff
  maxChunkTimer = setTimeout(() => {
    updateVADConfig(MAX_CHUNK_SILENCE_MS);
  }, MAX_CHUNK_MS);
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
  clearTimeout(minChunkTimer);
  clearTimeout(maxChunkTimer);
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
