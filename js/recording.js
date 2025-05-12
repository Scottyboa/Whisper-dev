// recording.js
// Implements real-time transcription via HTTP signaling and WebRTC DataChannel

export function initRecording() {
  // Wire up Start, Stop, and Pause/Resume buttons
  const startBtn = document.getElementById('startButton');
  const stopBtn = document.getElementById('stopButton');
  const pauseBtn = document.getElementById('pauseResumeButton');

  if (startBtn) startBtn.onclick = startRecording;
  if (stopBtn) stopBtn.onclick = stopRecording;
  if (pauseBtn) {
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause Recording';
    pauseBtn.onclick = togglePause;
  }

  // Initial button states
  if (startBtn) startBtn.disabled = false;
  if (stopBtn) stopBtn.disabled = true;
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
    throw new Error(`Invalid token payload, expected strings: ${JSON.stringify(raw)}`);
  }
  return { token, sessionId };
}

// Start recording: use HTTP signaling instead of WebSocket
async function startRecording() {
  try {
    updateStatusMessage('Getting ephemeral token…');
    const { token, sessionId } = await fetchEphemeralToken();
    console.log('✅ Using token:', token, 'sessionId:', sessionId);

    // Create RTCPeerConnection & DataChannel
      pc = new RTCPeerConnection();
  // Create a channel with an *empty* label so it matches what the server uses
  const dc = pc.createDataChannel('');
  dc.onopen = () => updateStatusMessage('Recording… speak now!', 'green');
  dc.onmessage = (evt) => {
    const msg = JSON.parse(evt.data);
    if (msg.type === 'transcript' && msg.data?.text) {
      const out = document.getElementById('transcription');
      out.value += msg.data.text + '\n';
      out.scrollTop = out.scrollHeight;
    }
  };

    // Hook up the mic
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStream.getTracks().forEach(track => pc.addTrack(track, mediaStream));

    // Create & set local SDP offer
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    // Signal via HTTP
    const signalUrl = 'https://api.openai.com/v1/realtime';
    const signalResponse = await fetch(signalUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type':  'application/sdp'
      },
      body: offer.sdp
    });
    const answerSdp = await signalResponse.text();
    if (!signalResponse.ok) {
      console.error(
        '❌ Signal error:',
        signalResponse.status,
        signalResponse.statusText,
        answerSdp
      );
      throw new Error(`Failed to signal SDP offer: ${signalResponse.status}`);
    }

    // Apply the SDP answer
    await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp });

    // Update buttons
    document.getElementById('startButton').disabled = true;
    document.getElementById('stopButton').disabled  = false;
    const pauseBtn = document.getElementById('pauseResumeButton');
    if (pauseBtn) pauseBtn.disabled = false;

    updateStatusMessage('Recording… speak now!', 'green');

  } catch (err) {
    console.error('startRecording error:', err);
    updateStatusMessage(`Error: ${err.message}`, 'red');
  }
}

// Stop recording: clean up and reset UI
function stopRecording() {
  if (pc) {
    pc.close();
    pc = null;
  }
  if (mediaStream) {
    mediaStream.getTracks().forEach(t => t.stop());
    mediaStream = null;
  }
  clearInterval(recordingTimerInterval);

  // Reset buttons
  const startBtn = document.getElementById('startButton');
  const stopBtn  = document.getElementById('stopButton');
  const pauseBtn = document.getElementById('pauseResumeButton');
  if (startBtn) startBtn.disabled = false;
  if (stopBtn)  stopBtn.disabled  = true;
  if (pauseBtn) {
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause Recording';
  }

  updateStatusMessage('Transcription finished!', 'green');
}

// Toggle pause/resume: mute/unmute mic track
function togglePause() {
  const pauseBtn = document.getElementById('pauseResumeButton');
  if (!pc || !pauseBtn) return;
  const isPause = pauseBtn.textContent === 'Pause Recording';
  pc.getSenders().forEach(s => {
    if (s.track && s.track.kind === 'audio') {
      s.track.enabled = isPause ? false : true;
    }
  });
  pauseBtn.textContent = isPause ? 'Resume Recording' : 'Pause Recording';
}
