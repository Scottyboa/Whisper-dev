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
    updateStatusMessage('Getting ephemeral token…');
    const { token, sessionId } = await fetchEphemeralToken();
    console.log('✅ Using token:', token, 'sessionId:', sessionId);

    // 1) Create the RTCPeerConnection & DataChannel
    pc = new RTCPeerConnection();
    const dc = pc.createDataChannel('oai-events');
    dc.onmessage = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.type === 'transcript') {
        document.getElementById('transcript').value += msg.data.text + '\n';
      }
    };

    // 2) Hook up the mic
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStream.getTracks().forEach(track => pc.addTrack(track, mediaStream));

    // 3) Create & set the local SDP offer
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    // 4) Signal via HTTP instead of WebSocket
    const signalUrl = 'https://api.openai.com/v1/realtime';
    const signalResponse = await fetch(signalUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type':  'application/sdp'
      },
      body: offer.sdp
    });

    const signalText = await signalResponse.text();
    if (!signalResponse.ok) {
      console.error(
        '❌ Signal error:',
        signalResponse.status,
        signalResponse.statusText,
        signalText
      );
      throw new Error(`Failed to signal SDP offer: ${signalResponse.status}`);
    }

    // 5) Apply the SDP answer from OpenAI
    await pc.setRemoteDescription({ type: 'answer', sdp: signalText });

    updateStatusMessage('Recording… speak now!', 'green');

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
