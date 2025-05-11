// recording.js
// Real-time transcription using GPT-4o Realtime Preview via WebRTC signaling

let pc = null;
let ws = null;
let mediaStream = null;
let recordingTimerInterval = null;
let recordingStartTime = 0;

// UI Helpers
function updateStatusMessage(message, color = '#333') {
  const statusElem = document.getElementById('statusMessage');
  if (statusElem) {
    statusElem.textContent = message;
    statusElem.style.color = color;
  }
}

// Retrieve stored API key from sessionStorage
function getAPIKey() {
  return sessionStorage.getItem('OPENAI_API_KEY');
}

// Fetch ephemeral token & session ID via Netlify Function
async function fetchEphemeralToken() {
  const apiKey = getAPIKey();
  if (!apiKey) throw new Error('API key not set in sessionStorage');
  const resp = await fetch('/.netlify/functions/get-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey })
  });
  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Failed to fetch token: ${errText}`);
  }
  return await resp.json(); // { token, sessionId }
}

// Start real-time transcription
async function startRecording() {
  try {
    updateStatusMessage('Initializing...', '#555');
    const { token, sessionId } = await fetchEphemeralToken();

    ws = new WebSocket(`wss://realtime.openai.com/ws?session_id=${sessionId}&token=${token}`);

    ws.onopen = async () => {
      updateStatusMessage('Connection open. Setting up WebRTC...', '#555');

      pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.openai.com:3478' }] });

      // Capture microphone audio
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.getTracks().forEach(track => pc.addTrack(track, mediaStream));

      // Send ICE candidates to server
      pc.onicecandidate = ({ candidate }) => {
        if (candidate) {
          ws.send(JSON.stringify({ type: 'ice_candidate', data: candidate }));
        }
      };

      // Receive transcripts via DataChannel
      pc.ondatachannel = (event) => {
        const dc = event.channel;
        dc.onmessage = (msg) => {
          const parsed = JSON.parse(msg.data);
          if (parsed.type === 'transcript') {
            const output = document.getElementById('transcript');
            if (output) output.value = parsed.data.text;
          }
        };
      };

      // Create and send SDP offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      ws.send(JSON.stringify({ type: 'sdp_offer', data: offer }));

      // Start UI timer
      startTimer();
      updateStatusMessage('Recording...', '#080');
    };

    ws.onmessage = async (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'sdp_answer') {
        await pc.setRemoteDescription(msg.data);
      } else if (msg.type === 'ice_candidate') {
        await pc.addIceCandidate(msg.data);
      }
    };

    ws.onerror = (err) => {
      console.error('WebSocket error:', err);
      updateStatusMessage('WebSocket error', '#f00');
      stopRecording();
    };

    ws.onclose = () => {
      cleanup();
      updateStatusMessage('Connection closed', '#333');
    };

  } catch (err) {
    console.error(err);
    updateStatusMessage(err.message, '#f00');
    stopRecording();
  }
}

// Stop recording and cleanup
function stopRecording() {
  if (recordingTimerInterval) clearInterval(recordingTimerInterval);
  if (mediaStream) mediaStream.getTracks().forEach(track => track.stop());
  if (pc) pc.close();
  if (ws) ws.close();
  updateStatusMessage('Stopped.', '#333');
  const startBtn = document.getElementById('startButton');
  if (startBtn) startBtn.disabled = false;
}

function cleanup() {
  if (pc) { pc.close(); pc = null; }
  if (ws) { ws.close(); ws = null; }
  if (mediaStream) { mediaStream.getTracks().forEach(t => t.stop()); mediaStream = null; }
  if (recordingTimerInterval) { clearInterval(recordingTimerInterval); recordingTimerInterval = null; }
}

// Recording timer UI
function startTimer() {
  recordingStartTime = Date.now();
  recordingTimerInterval = setInterval(() => {
    const elapsed = Date.now() - recordingStartTime;
    const mins = String(Math.floor(elapsed / 60000)).padStart(2, '0');
    const secs = String(Math.floor((elapsed % 60000) / 1000)).padStart(2, '0');
    const timer = document.getElementById('timer');
    if (timer) timer.textContent = `${mins}:${secs}`;
  }, 500);
}

// Bind UI buttons
document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startButton');
  const stopBtn = document.getElementById('stopButton');
  if (startBtn) startBtn.addEventListener('click', () => { startBtn.disabled = true; startRecording(); });
  if (stopBtn) stopBtn.addEventListener('click', stopRecording);
});
