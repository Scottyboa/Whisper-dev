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

function updateTimer() {
  const elapsed = Date.now() - recordingStartTime;
  const seconds = Math.floor(elapsed / 1000);
  const timerElem = document.getElementById('recordingTimer');
  if (timerElem) timerElem.textContent = `${seconds}s`;
}

// Fetch ephemeral token and session ID from Netlify function
async function fetchEphemeralToken() {
  const apiKey = sessionStorage.getItem('user_api_key');
  const resp = await fetch('/.netlify/functions/get-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userKey: apiKey })
  });
  if (!resp.ok) throw new Error(`Token fetch failed: ${resp.statusText}`);
  const { token, sessionId } = await resp.json();
  return { token, sessionId };
}

// Start recording and transcription
async function startRecording() {
  try {
    updateStatusMessage('Initializing...', '#555');
    const { token, sessionId } = await fetchEphemeralToken();

    ws = new WebSocket(`wss://realtime.openai.com/ws?session_id=${sessionId}&token=${token}`);
    pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });

    ws.onopen = async () => {
      updateStatusMessage('WebSocket open. Getting microphone…');
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.getTracks().forEach(track => pc.addTrack(track, mediaStream));

      pc.onicecandidate = event => {
        if (event.candidate) {
          ws.send(JSON.stringify({ type: 'ice_candidate', data: event.candidate }));
        }
      };

      pc.ontrack = () => {
        // no-op: transcripts come over WebSocket
      };

      pc.ondatachannel = () => {
        // no-op
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      ws.send(JSON.stringify({ type: 'sdp_offer', data: offer }));

      // Start timer
      recordingStartTime = Date.now();
      recordingTimerInterval = setInterval(updateTimer, 1000);
      document.getElementById('startButton').disabled = true;
      document.getElementById('stopButton').disabled = false;
      updateStatusMessage('Recording…');
    };

    ws.onmessage = event => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'sdp_answer') {
        pc.setRemoteDescription(new RTCSessionDescription(msg.data));
      } else if (msg.type === 'ice_candidate') {
        pc.addIceCandidate(new RTCIceCandidate(msg.data));
      } else if (msg.type === 'transcript') {
        const { text } = msg.data;
        const textarea = document.getElementById('transcriptOutput');
        if (textarea) textarea.value = text;
      }
    };

    ws.onerror = err => {
      console.error('WebSocket error:', err);
      updateStatusMessage('WebSocket error', 'red');
    };

  } catch (err) {
    console.error(err);
    updateStatusMessage(err.message, 'red');
  }
}

// Stop recording and clean up
function stopRecording() {
  if (recordingTimerInterval) clearInterval(recordingTimerInterval);
  if (mediaStream) mediaStream.getTracks().forEach(t => t.stop());
  if (pc) pc.close();
  if (ws) ws.close();
  document.getElementById('startButton').disabled = false;
  document.getElementById('stopButton').disabled = true;
  updateStatusMessage('Ready');
  const timerElem = document.getElementById('recordingTimer');
  if (timerElem) timerElem.textContent = '0s';
}

// Initialization for main.js
export function initRecording() {
  const startBtn = document.getElementById('startButton');
  const stopBtn = document.getElementById('stopButton');
  if (startBtn) startBtn.addEventListener('click', startRecording);
  if (stopBtn) stopBtn.addEventListener('click', stopRecording);
  updateStatusMessage('Ready');
}
