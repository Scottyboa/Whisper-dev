// recording.js
// Implements real-time transcription via WebRTC & OpenAI Realtime Transcription API

// Exported init function to wire up UI
export function initRecording() {
  // Ensure elements with these IDs exist in your HTML (e.g., startButton, stopButton, transcript textarea, statusMessage div)
  document.getElementById('startButton').onclick = startRecording;
  document.getElementById('stopButton').onclick  = stopRecording;
}

// Globals
let pc = null;
let ws = null;
let mediaStream = null;

// Utility: update status text/color
function updateStatusMessage(message, color = '#333') {
  const el = document.getElementById('statusMessage');
  if (el) {
    el.textContent = message;
    el.style.color = color;
  }
}

// Fetch ephemeral token & sessionId from your Netlify function
async function fetchEphemeralToken() {
  const apiKey = sessionStorage.getItem('user_api_key');
  if (!apiKey) throw new Error('API key not found in sessionStorage');

  const resp = await fetch('/.netlify/functions/get-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userKey: apiKey })
  });
  const raw = await resp.json();
  console.log('RAW get-token response →', raw);

  // Support both new {token, sessionId} and old {client_secret, session_id}
  const token     = raw.token     ?? raw.client_secret?.value;
  const sessionId = raw.sessionId ?? raw.session_id;

  if (!token || !sessionId) {
    throw new Error(`Invalid token payload: ${JSON.stringify(raw)}`);
  }
  return { token, sessionId };
}

// Start transcription: open WS, negotiate WebRTC, stream transcripts
async function startRecording() {
  updateStatusMessage('Initializing...', 'blue');
  try {
    const { token, sessionId } = await fetchEphemeralToken();

    // Open signaling WebSocket
    ws = new WebSocket(`wss://realtime.openai.com/ws?session_id=${sessionId}&token=${token}`);

    ws.onopen = async () => {
      updateStatusMessage('Connected. Setting up media...', 'blue');

      // Set up PeerConnection
      pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
      pc.onicecandidate = e => {
        if (e.candidate) ws.send(JSON.stringify({ type: 'ice_candidate', data: e.candidate }));
      };

      // DataChannel receives transcript messages
      const dc = pc.createDataChannel('transcripts');
      dc.onmessage = ({ data }) => {
        const msg = JSON.parse(data);
        if (msg.type === 'transcript') {
          const ta = document.getElementById('transcript');
          ta.value += msg.data.text + '\n';
        }
      };

      // Add mic audio
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.getTracks().forEach(track => pc.addTrack(track, mediaStream));

      // SDP offer/answer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      ws.send(JSON.stringify({ type: 'sdp_offer', data: offer }));

      updateStatusMessage('Streaming...', 'green');
    };

    ws.onmessage = async ({ data }) => {
      const msg = JSON.parse(data);
      if (msg.type === 'sdp_answer') {
        await pc.setRemoteDescription(msg.data);
      } else if (msg.type === 'ice_candidate') {
        await pc.addIceCandidate(msg.data);
      }
    };

    ws.onerror = err => {
      console.error('WebSocket error', err);
      updateStatusMessage('WebSocket error', 'red');
    };

    ws.onclose = () => {
      updateStatusMessage('Connection closed', 'gray');
    };
  } catch (err) {
    console.error(err);
    updateStatusMessage(err.message, 'red');
  }
}

// Stop transcription: close everything
function stopRecording() {
  if (mediaStream) {
    mediaStream.getTracks().forEach(t => t.stop());
    mediaStream = null;
  }
  if (pc) {
    pc.close(); pc = null;
  }
  if (ws) {
    ws.close(); ws = null;
  }
  updateStatusMessage('Stopped', 'gray');
}
