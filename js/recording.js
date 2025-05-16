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



let session = null;
let sessionConfig = null;
let vadTime = 0;
let isStopping = false;
let mediaStream    = null; 

function initState() {
  // initial button states
  updateState(false);

  startMicBtn.addEventListener("click", startMicrophone);
  pauseBtn .addEventListener("click", toggleMute);    // if you have a pause/resume
  stopBtn  .addEventListener("click", stop);
}

function updateState(started) {
  statusEl.textContent = "";
  startMicBtn.disabled  = started;
  stopBtn.disabled      = !started;
  pauseBtn.disabled     = !started;
}

function toggleMute() {
  if (!session) return;
  isMuted = !isMuted;
  session.mute(isMuted);
  pauseBtn.textContent = isMuted ? "Resume Recording" : "Pause Recording";
}

async function startMicrophone() {
  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (err) {
    alert("Microphone error: " + err.message);
    return;
  }
  mediaStream = stream;    // ← keep this for later teardown
  await start(stream);
}

async function start(stream) {
  updateState(true);
  transcriptEl.value = "";

    // pull the key from sessionStorage, exactly how index.html stored it:
  const apiKey = sessionStorage.getItem("user_api_key");
  if (!apiKey) {
    alert("Missing API key—please re-enter it on the home page.");
    return stop();
  }
   const USE_WEBSOCKETS = true;   // ← set false to fall back to WebRTC
    console.log("▶▶ USE_WEBSOCKETS =", USE_WEBSOCKETS);    
 if (USE_WEBSOCKETS) {
   console.log("▶▶ instantiating WebSocketSession");
   session = new WebSocketSession(apiKey);
 } else {
   console.log("▶▶ instantiating WebRTC Session");
   session = new Session(apiKey);
 }
  session.onmessage = handleMessage;
  session.onerror = handleError;

sessionConfig = {
  input_audio_transcription: {
    model: "gpt-4o-transcribe"
  },
  turn_detection: {
    type: "server_vad",
    threshold: 0.4,
    prefix_padding_ms: 400,
    silence_duration_ms: 2000
  }
};

  try {
    await session.startTranscription(stream, sessionConfig);
  } catch (err) {
    alert("Connection error: " + err.message);
    stop();
  }
}

 function stop() {
     if (!session) return;
  isStopping = true;                                      // ← mark that we’re finishing up
  // flush the final buffer
  const stopMsg = { type: "input_audio_buffer.stop" };
  if (typeof session.sendMessage === "function") {
    // for WebRTC Session
    session.sendMessage(stopMsg);
  } else if (session.ws?.readyState === WebSocket.OPEN) {
    // for WebSocketSession
    session.ws.send(JSON.stringify(stopMsg));
  }
     // 2️⃣ immediately shut off the mic tracks (browser indicator goes out)
  if (mediaStream) {
    mediaStream.getTracks().forEach(t => t.stop());
    mediaStream = null;
  }
 }

function handleMessage(parsed) {
  switch (parsed.type) {
    case "transcription_session.created":
      sessionConfig = parsed.session;
      break;
    case "input_audio_buffer.speech_started":
  // user just started speaking: show “…” placeholder
  transcriptEl.value += "...";
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
  // replace the sole “***” placeholder with the real transcript
  transcriptEl.value = transcriptEl.value.replace(/\*{3}(?!.*\*{3})/, parsed.transcript);
  // add a space so next chunk doesn’t jam right up against this one
  transcriptEl.value += " ";

  // now do your stopping teardown
  // only now tear down the session _and_ reset the UI
  if (isStopping) {
    isStopping = false;
    session.stop();
    session = null;
    updateState(false);         // ← re-enable Start / disable Stop
    pauseBtn.textContent = "Pause Recording"; // reset if you want
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
  stop();
}

// Export the initialization function to be called from main.js
export function initRecording() {
  initState();
}
