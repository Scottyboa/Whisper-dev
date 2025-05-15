// js/recording.js

// --- Session class for Realtime Transcription ---
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
const $                 = document.querySelector.bind(document);
const apiKeyEl          = $("#openai-api-key");
const modelEl           = $("#model");
const promptEl          = $("#prompt");
const turnDetectionEl   = $("#turn-detection");
const transcriptEl      = $("#transcript");
const startMicBtn       = $("#start-microphone");
const startFileBtn      = $("#start-file");
const stopBtn           = $("#stop");
const statusEl          = $("#status");
const audioInputEl      = $("#audio-file");
const filePickerEl      = $("#audio-file-picker");

const prefs = [apiKeyEl, modelEl, promptEl, turnDetectionEl];
let session = null;
let sessionConfig = null;
let vadTime = 0;

function initState() {
  prefs.forEach(p => {
    const fqid = p.id !== "openai-api-key" ? APP_PREFIX + p.id : p.id;
    const v = localStorage.getItem(fqid);
    if (v) p.value = v;
    p.addEventListener("change", () => localStorage.setItem(fqid, p.value));
  });

  updateState(false);
  startMicBtn.addEventListener("click", startMicrophone);
  startFileBtn.addEventListener("click", startFile);
  filePickerEl.addEventListener("change", handleFileSelect);
  stopBtn.addEventListener("click", stop);
}

function updateState(started) {
  statusEl.textContent = "";
  prefs.forEach(p => p.disabled = started);
  startMicBtn.disabled  = started;
  startFileBtn.disabled = started;
  stopBtn.disabled      = !started;
}

async function startMicrophone() {
  if (!apiKeyEl.value) {
    alert("Please enter your OpenAI API Key (https://platform.openai.com/settings/organization/api-keys)");
    return;
  }
  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (err) {
    alert("Microphone error: " + err.message);
    return;
  }
  await start(stream);
}

function handleFileSelect(e) {
  const file = e.target.files[0];
  if (file) audioInputEl.src = URL.createObjectURL(file);
  startFile();
}

async function startFile() {
  if (!apiKeyEl.value) {
    alert("Please enter your OpenAI API Key (https://platform.openai.com/settings/organization/api-keys)");
    return;
  }
  audioInputEl.currentTime = 0;
  audioInputEl.onended = () => setTimeout(stop, 3000);
  if (audioInputEl.readyState !== HTMLMediaElement.HAVE_METADATA) {
    await new Promise(r => audioInputEl.onloadedmetadata = r);
  }
  const stream = audioInputEl.captureStream();
  await start(stream);
  await audioInputEl.play();
}

async function start(stream) {
  updateState(true);
  transcriptEl.value = "";

  session = new Session(apiKeyEl.value);
  session.onconnectionstatechange = state => statusEl.textContent = state;
  session.onmessage = handleMessage;
  session.onerror = handleError;

  sessionConfig = {
    input_audio_transcription: { model: modelEl.value, prompt: promptEl.value || undefined },
    turn_detection: { type: turnDetectionEl.value }
  };

  try {
    await session.startTranscription(stream, sessionConfig);
  } catch (err) {
    alert("Connection error: " + err.message);
    stop();
  }
}

function stop() {
  updateState(false);
  audioInputEl.pause();
  session?.stop();
  session = null;
}

function handleMessage(parsed) {
  switch (parsed.type) {
    case "transcription_session.created":
      sessionConfig = parsed.session;
      break;
    case "input_audio_buffer.speech_started":
      handleTranscript({ transcript: "...", partial: true });
      break;
    case "input_audio_buffer.speech_stopped":
      handleTranscript({ transcript: "***", partial: true });
      vadTime = performance.now() - (sessionConfig.turn_detection.silence_duration_ms || 0);
      break;
    case "conversation.item.input_audio_transcription.delta":
      // Optionally show partial delta
      break;
    case "conversation.item.input_audio_transcription.completed":
      const elapsed = performance.now() - vadTime;
      handleTranscript({ transcript: parsed.transcript, partial: false });
      break;
  }
}

function handleTranscript({ transcript, partial }) {
  const cut = transcriptEl.value.lastIndexOf("\n");
  transcriptEl.value = transcriptEl.value.substring(0, cut + 1) + transcript;
  if (!partial) transcriptEl.value += "\n";
  transcriptEl.scrollTop = transcriptEl.scrollHeight;
}

function handleError(e) {
  console.error(e);
  stop();
}

// Initialize on load
initState();
