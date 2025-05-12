// recording.js
// Implements real-time transcription via HTTP signaling and WebRTC DataChannel

// Wire up UI elements: Start, Stop, Pause/Resume buttons
export function initRecording() {
  const startBtn = document.getElementById('startButton');
  const stopBtn = document.getElementById('stopButton');
  const pauseBtn = document.getElementById('pauseResumeButton');

  if (startBtn) startBtn.onclick = startRecording;
  if (stopBtn)  stopBtn.onclick  = stopRecording;
  if (pauseBtn) {
    pauseBtn.onclick = togglePause;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause Recording';
  }

  // Initial state
  if (startBtn) startBtn.disabled = false;
  if (stopBtn)  stopBtn.disabled  = true;
}

// Globals
let pc = null;
let mediaStream = null;

// UI helper
function updateStatusMessage(message, color = '#333') {
  const statusElem = document.getElementById('statusMessage');
  if (statusElem) {
    statusElem.textContent = message;
    statusElem.style.color = color;
  }
}

// Fetch ephemeral key + sessionId from Netlify
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
  if (!resp.ok) throw new Error(`Token fetch failed: ${raw.error || JSON.stringify(raw)}`);

  const { token, sessionId } = raw;
  if (typeof token !== 'string' || typeof sessionId !== 'string') {
    throw new Error(`Invalid token payload, expected strings: ${JSON.stringify(raw)}`);
  }
  return { token, sessionId };
}

// Start recording: HTTP-signal the SDP offer, then stream transcripts
async function startRecording() {
  try {
    updateStatusMessage('Getting ephemeral token…', 'blue');
    const { token, sessionId } = await fetchEphemeralToken();
    console.log('✅ Using token:', token, 'sessionId:', sessionId);

    // 1) PeerConnection
    pc = new RTCPeerConnection();
    console.log('🔧 pc created:', pc);

    // 2) DataChannel
    const dc = pc.createDataChannel('');
    console.log('🔧 dc created:', dc.label, dc);

    dc.onopen = () => {
      console.log('🔗 dc opened');
      updateStatusMessage('Recording… speak now!', 'green');
    };
    dc.onmessage = (evt) => {
      console.log('📨 dc message:', evt.data);
      const msg = JSON.parse(evt.data);
      if (msg.type === 'transcript' && msg.data?.text) {
        const out = document.getElementById('transcription');
        out.value += msg.data.text + '\n';
        out.scrollTop = out.scrollHeight;
      }
    };

    // 3) Mic
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    console.log('🎙️ mediaStream tracks:', mediaStream.getTracks());
    mediaStream.getTracks().forEach(track => pc.addTrack(track, mediaStream));

    // 4) SDP offer
    const offer = await pc.createOffer();
    console.log('📝 offer created:', offer);
    await pc.setLocalDescription(offer);
    console.log('📝 setLocalDescription complete:', pc.localDescription);

    // 5) Signal SDP
    console.log('🚀 sending SDP to https://api.openai.com/v1/realtime?session_id=' + sessionId);
    const signalUrl = `https://api.openai.com/v1/realtime?session_id=${sessionId}`;
    const signalResponse = await fetch(signalUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type':  'application/sdp'
      },
      body: pc.localDescription.sdp
    });
    console.log('🚀 signalResponse status:', signalResponse.status);
    const answerSdp = await signalResponse.text();
    console.log('🚀 signalResponse text:', answerSdp);
    if (!signalResponse.ok) {
      throw new Error(`SDP signal failed: ${signalResponse.status}`);
    }

    // 6) Apply answer
    console.log('🔄 setting remote description');
    await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp });
    console.log('🔄 remote description set');

    // 7) Toggle UI
    document.getElementById('startButton').disabled = true;
    document.getElementById('stopButton').disabled  = false;
    const pauseBtn = document.getElementById('pauseResumeButton');
    if (pauseBtn) pauseBtn.disabled = false;

  } catch (err) {
    console.error('startRecording error:', err);
    updateStatusMessage(`Error: ${err.message}`, 'red');
    document.getElementById('startButton').disabled = false;
  }
}

// Stop recording: cleanup and reset UI
function stopRecording() {
  if (pc) {
    pc.close();
    pc = null;
  }
  if (mediaStream) {
    mediaStream.getTracks().forEach(t => t.stop());
    mediaStream = null;
  }

  document.getElementById('startButton').disabled = false;
  document.getElementById('stopButton').disabled  = true;
  const pauseBtn = document.getElementById('pauseResumeButton');
  if (pauseBtn) {
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause Recording';
  }

  updateStatusMessage('Transcription finished!', 'blue');
}

// Toggle pause/resume of the mic track
function togglePause() {
  const pauseBtn = document.getElementById('pauseResumeButton');
  if (!pc || !pauseBtn) return;
  const isPausing = pauseBtn.textContent === 'Pause Recording';
  pc.getSenders().forEach(sender => {
    if (sender.track && sender.track.kind === 'audio') {
      sender.track.enabled = !isPausing;
    }
  });
  pauseBtn.textContent = isPausing ? 'Resume Recording' : 'Pause Recording';
}
