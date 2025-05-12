// recording.js
// Implements real-time transcription via HTTP signaling and WebRTC DataChannel

export function initRecording() {
  document.getElementById('startButton').onclick = startRecording;
  document.getElementById('stopButton').onclick = stopRecording;
}

let pc = null;
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

function updateTranscript(text) {
  const textarea = document.getElementById('transcript');
  if (textarea) {
    textarea.value += text + "\n";
  }
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
  const raw = await resp.json();
  console.log('💡 RAW get-token response →', raw);
  if (!resp.ok) throw new Error(`Token fetch failed: ${JSON.stringify(raw)}`);

  const { token, sessionId } = raw;
  if (typeof token !== 'string' || typeof sessionId !== 'string') {
    throw new Error(`Invalid token payload: ${JSON.stringify(raw)}`);
  }
  return { token, sessionId };
}

// Start recording: use HTTP signaling instead of WebSocket
async function startRecording() {
  try {
    updateStatusMessage('Initializing transcription...');
    const { token, sessionId } = await fetchEphemeralToken();
    console.log('✅ Using token:', token, 'sessionId:', sessionId);

    const realtimeUrl = 'https://api.openai.com/v1/realtime';

    // Create PeerConnection and DataChannel
    pc = new RTCPeerConnection();
    const dc = pc.createDataChannel('transcription');
    dc.onopen = () => updateStatusMessage('Recording... Speak now.', 'green');
    dc.onmessage = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.type === 'transcript') {
        updateTranscript(msg.data.text);
      }
    };

    // Capture microphone
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStream.getTracks().forEach(track => pc.addTrack(track, mediaStream));

    // Create SDP offer
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    // Signal via HTTP POST
    const signalResp = await fetch(realtimeUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type':  'application/sdp'
      },
      body: offer.sdp
    });
    if (!signalResp.ok) throw new Error('Failed to signal SDP offer');

    // Set remote description from SDP answer
    const answerSdp = await signalResp.text();
    await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp });

    // Start timer UI if needed
    recordingStartTime = Date.now();
    recordingTimerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
      updateStatusMessage(`Recording... ${elapsed}s`, 'green');
    }, 1000);

  } catch (err) {
    console.error('startRecording error:', err);
    updateStatusMessage(`Error: ${err.message}`, 'red');
  }
}

// Stop recording: clean up
function stopRecording() {
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
    mediaStream = null;
  }
  if (pc) {
    pc.close();
    pc = null;
  }
  if (recordingTimerInterval) {
    clearInterval(recordingTimerInterval);
    recordingTimerInterval = null;
  }
  updateStatusMessage('Recording stopped.', '#333');
}
