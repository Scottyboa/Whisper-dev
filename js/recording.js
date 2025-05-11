// recording.js
// Real-time transcription using GPT-4o Realtime Preview via WebRTC signaling
// Replace chunked Whisper logic with a live streaming pipeline.

let pc = null;
let ws = null;
let mediaStream = null;
let recordingTimerInterval = null;
let recordingStartTime = 0;

// UI Helpers
function updateStatusMessage(message, color = '#333') {
  const statusElem = document.getElementById('statusMessage');
  if (statusElem) {
    statusElem.innerText = message;
    statusElem.style.color = color;
  }
}

function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;
  return minutes + ' min ' + seconds + ' sec';
}

function updateRecordingTimer() {
  const elapsed = Date.now() - recordingStartTime;
  const timerElem = document.getElementById('recordTimer');
  if (timerElem) {
    timerElem.innerText = 'Recording Timer: ' + formatTime(elapsed);
  }
}

function getAPIKey() {
  return sessionStorage.getItem('user_api_key');
}

// Replaced direct OpenAI token fetch with Netlify Function proxy at /.netlify/functions/get-token
async function fetchEphemeralToken() {
  const apiKey = getAPIKey();
  if (!apiKey) throw new Error('API key not available');

  const resp = await fetch('/.netlify/functions/get-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userKey: apiKey })
  });

  if (!resp.ok) {
    let errText;
    try { errText = await resp.text(); } catch (e) { errText = `<unreadable>`; }
    console.error('Token function returned failure:', resp.status, errText);
    throw new Error(`Token fetch failed ${resp.status}: ${errText}`);
  }

  // Now pull both values:
  const { client_secret: token, session_id: sessionId } = await resp.json();
  return { token, sessionId };
}

function updateTranscript(text) {
  const transcriptionElem = document.getElementById('transcription');
  if (transcriptionElem) {
    transcriptionElem.value = text;
  }
}

async function startRecording() {
  const startBtn = document.getElementById('startButton');
  const stopBtn = document.getElementById('stopButton');
  startBtn.disabled = true;
  stopBtn.disabled = false;

  const apiKey = getAPIKey();
  if (!apiKey || !apiKey.startsWith('sk-')) {
    alert('Please enter a valid OpenAI API key.');
    startBtn.disabled = false;
    return;
  }

  updateStatusMessage('Initializing real-time transcription...', 'blue');

  try {
    // 1. Fetch ephemeral token via Netlify Function proxy
    const { token, sessionId } = await fetchEphemeralToken();

// 2. Open signaling WebSocket with sessionId & token
ws = new WebSocket(
  `wss://realtime.openai.com/ws?session_id=${sessionId}&token=${token}`
);

    // 3. Create RTCPeerConnection
    pc = new RTCPeerConnection({
      iceServers: [{ urls: ['stun:stun.openai.com:443'] }]
    });

// 4. Handle incoming WebSocket messages (SDP answer, ICE, transcript)
ws.onmessage = async (evt) => {
  const msg = JSON.parse(evt.data);

  // 4a. SDP answer from server
  if (msg.type === 'sdp_answer') {
    await pc.setRemoteDescription(msg.data);

  // 4b. ICE candidate from server
  } else if (msg.type === 'ice_candidate') {
    await pc.addIceCandidate(msg.data);

  // 4c. Transcript event
  } else if (msg.type === 'transcript') {
    updateTranscript(msg.data.text);
  }
};

// 5. Send local ICE candidates
pc.onicecandidate = (e) => {
  if (!e.candidate) return;
  ws.send(JSON.stringify({
    type: 'ice_candidate',
    data: e.candidate
  }));
};

// …later, after adding your audio tracks…

// 6. Create & send our SDP offer
const offer = await pc.createOffer();
await pc.setLocalDescription(offer);
ws.send(JSON.stringify({
  type: 'sdp_offer',
  data: offer
}));

    // 6. Capture microphone and add to peer
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStream.getTracks().forEach(track => pc.addTrack(track, mediaStream));

    // 7. Start recording timer
    recordingStartTime = Date.now();
    recordingTimerInterval = setInterval(updateRecordingTimer, 1000);

    updateStatusMessage('Recording... Speak now.', 'green');

  } catch (err) {
    console.error(err);
    updateStatusMessage('Error: ' + err.message, 'red');
    document.getElementById('startButton').disabled = false;
  }
}

function stopRecording() {
  // Close peer and WebSocket
  if (pc) {
    pc.close(); pc = null;
  }
  if (ws) {
    ws.close(); ws = null;
  }
  // Stop microphone
  if (mediaStream) {
    mediaStream.getTracks().forEach(t => t.stop());
    mediaStream = null;
  }
  // Stop timer
  clearInterval(recordingTimerInterval);

  // Update buttons and status
  document.getElementById('startButton').disabled = false;
  document.getElementById('stopButton').disabled = true;
  updateStatusMessage('Transcription finished!', 'green');
}

function initRecording() {
  const startBtn = document.getElementById('startButton');
  const stopBtn = document.getElementById('stopButton');
  if (startBtn && stopBtn) {
    startBtn.addEventListener('click', startRecording);
    stopBtn.addEventListener('click', stopRecording);
    stopBtn.disabled = true;
  }
}

export { initRecording };
