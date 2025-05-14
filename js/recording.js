// recording.js
// Real-time transcription via WebRTC DataChannel using OpenAI Realtime API.

// Session class encapsulates signaling and DataChannel handling
class Session {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.useSessionToken = false; // we'll use an ephemeral token directly
    this.ms = null;
    this.pc = null;
    this.dc = null;
  }

  async startTranscription(stream, sessionConfig) {
    await this.startInternal(stream, sessionConfig, "/v1/realtime/transcription_sessions");
  }

  stop() {
    if (this.dc) {
      this.dc.close();
      this.dc = null;
    }
    if (this.pc) {
      this.pc.close();
      this.pc = null;
    }
    if (this.ms) {
      this.ms.getTracks().forEach(t => t.stop());
      this.ms = null;
    }
  }

  async startInternal(stream, sessionConfig, tokenEndpoint) {
    this.ms = stream;
    this.pc = new RTCPeerConnection();
    this.pc.onconnectionstatechange = () => this.onconnectionstatechange?.(this.pc.connectionState);
    this.pc.addTrack(stream.getTracks()[0]);

    this.dc = this.pc.createDataChannel("oai-events");
    this.dc.onopen = () => this.onopen?.();
    this.dc.onmessage = e => this.onmessage?.(JSON.parse(e.data));
    this.dc.onerror = err => this.onerror?.(err);

    const offer = await this.pc.createOffer();
    await this.pc.setLocalDescription(offer);

    try {
      const answer = await this.signal(offer, sessionConfig, tokenEndpoint);
      await this.pc.setRemoteDescription(answer);
    } catch (e) {
      this.onerror?.(e);
    }
  }

  async signal(offer, sessionConfig, tokenEndpoint) {
    const urlRoot = "https://api.openai.com";
    const realtimeUrl = `${urlRoot}/v1/realtime`;
    let sdpResponse;

    if (this.useSessionToken) {
      // Session-token flow not used here
      throw new Error("Session-token flow is disabled");
    } else {
      const formData = new FormData();
      formData.append("session", JSON.stringify(sessionConfig));
      formData.append("sdp", offer.sdp);
      sdpResponse = await fetch(realtimeUrl, {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${this.apiKey}` },
      });
      if (!sdpResponse.ok) {
        throw new Error("Failed to signal");
      }
    }

    const sdp = await sdpResponse.text();
    return { type: "answer", sdp };
  }

  sendMessage(message) {
    this.dc.send(JSON.stringify(message));
  }
}

// UI Helpers (unchanged)
function updateStatus(msg, color = '#333') {
  const el = document.getElementById('statusMessage');
  if (el) {
    el.textContent = msg;
    el.style.color   = color;
  }
  console.log(`🛈 Status: ${msg}`);
}

function appendTranscript(text) {
  const ta = document.getElementById('transcription');
  if (!ta) {
    console.warn('⚠️ No #transcription element found');
    return;
  }
  ta.value += text + ' ';
  ta.scrollTop = ta.scrollHeight;
  console.log(`📝 Transcript: ${text}`);
}

// Fetch ephemeral token & sessionId from Netlify function
async function fetchEphemeralToken() {
  const apiKey = sessionStorage.getItem('user_api_key');
  if (!apiKey) throw new Error('No API key in sessionStorage under "user_api_key"');

  const resp = await fetch('/.netlify/functions/get-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userKey: apiKey })
  });
  const body = await resp.json();
  if (!resp.ok) throw new Error(`Token fetch failed: ${resp.status}`);
  const { token } = body;
  if (!token) throw new Error('Invalid token payload');
  return { token };
}

let session = null;

// Initialize event handlers for UI buttons
export function initRecording() {
  document.getElementById('startButton').onclick = startRecording;
  document.getElementById('stopButton').onclick  = stopRecording;
}

// Start recording and transcription
async function startRecording() {
  const transcriptionField = document.getElementById('transcription');
  if (transcriptionField) transcriptionField.value = '';

  updateStatus('Initializing…');

  try {
    const { token } = await fetchEphemeralToken();
    session = new Session(token);

    session.onconnectionstatechange = state => updateStatus(state);
    session.onerror = e => updateStatus(`Error: ${e.message}`, 'red');

    let sessionUpdated = false;

    session.onmessage = msg => {
      switch (msg.type) {
        case 'session.created':
          if (!sessionUpdated) {
            const controlMsg = {
              type: 'session.update',
              session: {
                input_audio_format: 'pcm16',
                input_audio_transcription: { model: 'gpt-4o-transcribe' },
                turn_detection: {
                  type: 'server_vad',
                  threshold: 0.3,
                  prefix_padding_ms: 700,
                  silence_duration_ms: 2500
                }
              }
            };
            session.sendMessage(controlMsg);
            sessionUpdated = true;
          }
          break;
        case 'session.updated':
          updateStatus('Recording… speak now!', 'green');
          document.getElementById('startButton').disabled = true;
          document.getElementById('stopButton').disabled  = false;
          break;
        case 'conversation.item.input_audio_transcription.completed':
          appendTranscript(msg.transcript);
          break;
        default:
          break;
      }
    };

    const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    await session.startTranscription(mediaStream, {});

  } catch (err) {
    updateStatus(`Error: ${err.message}`, 'red');
  }
}

// Stop recording and cleanup
function stopRecording() {
  if (session) {
    session.stop();
    session = null;
  }
  updateStatus('Recording stopped.');
  document.getElementById('startButton').disabled = false;
  document.getElementById('stopButton').disabled  = true;
}
