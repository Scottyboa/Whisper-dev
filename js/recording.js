// recording.js
// Real-time transcription via WebRTC + OpenAI Realtime API
// — integrates ephemeral token retrieval, SDP signaling, DataChannel event handling, and UI controls

// Initialize button event listeners
document.getElementById('startButton').addEventListener('click', startRecording);
document.getElementById('stopButton').addEventListener('click', stopRecording);
document.getElementById('pauseResumeButton').addEventListener('click', togglePauseRecording);

let pc = null;
let dc = null;
let mediaStream = null;
let isPaused = false;

// UI Helpers
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
  if (!ta) return;
  ta.value += text + ' ';
  ta.scrollTop = ta.scrollHeight;
  console.log(`📝 Transcript: ${text}`);
}

// 1) Fetch ephemeral token & sessionId from Netlify function
async function fetchEphemeralToken(model) {
  const apiKey = sessionStorage.getItem('user_api_key');
  if (!apiKey) throw new Error('No API key found in sessionStorage under "user_api_key"');

  const resp = await fetch('/.netlify/functions/get-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userKey: apiKey, model })
  });
  const body = await resp.json();
  if (!resp.ok) throw new Error(body.error || `Token fetch failed: ${resp.status}`);
  const { token, sessionId } = body;
  if (!token || !sessionId) throw new Error('Invalid token payload');
  console.log('✅ Got token & sessionId');
  return { token, sessionId };
}

// 2) Start recording & transcription
async function startRecording() {
  updateStatus('Initializing…');
  document.getElementById('transcription').value = '';

  // Determine model from UI
  const modelEl = document.getElementById('model');
  const model = modelEl ? modelEl.value : 'gpt-4o-transcribe';

  try {
    const { token } = await fetchEphemeralToken(model);

    pc = new RTCPeerConnection();
    console.log('🎧 PeerConnection created');

    // Debug hooks
    pc.onicecandidate             = e => console.log('➿ ICE candidate:', e.candidate);
    pc.onconnectionstatechange    = () => console.log('🔗 connectionState:', pc.connectionState);
    pc.onicegatheringstatechange  = () => console.log('⌛ iceGatheringState:', pc.iceGatheringState);

    // DataChannel for events
    dc = pc.createDataChannel('oai-events');
    console.log('📁 DataChannel created');

    let sessionUpdated = false;
    dc.onopen = () => console.log('🔓 DataChannel open');

    dc.onmessage = evt => {
      let msg;
      try { msg = JSON.parse(evt.data); } catch { return; }
      switch (msg.type) {
        case 'session.created':
          if (!sessionUpdated) {
            const controlMsg = {
              type: 'session.update',
              session: {
                input_audio_format: 'pcm16',
                input_audio_transcription: { model },
                turn_detection: {
                  type: 'server_vad',
                  threshold: 0.3,
                  prefix_padding_ms: 700,
                  silence_duration_ms: 2500
                }
              }
            };
            console.log('→ Sending session.update', controlMsg);
            dc.send(JSON.stringify(controlMsg));
            sessionUpdated = true;
          }
          break;
        case 'session.updated':
          updateStatus('Session ready. Recording… speak now!', 'green');
          break;
        case 'conversation.item.input_audio_transcription.completed':
          appendTranscript(msg.transcript);
          break;
        case 'transcript':
          appendTranscript(msg.data.text);
          break;
      }
    };

    dc.onerror = err => console.error('💥 DataChannel error:', err);
    dc.onclose = () => console.log('🔒 DataChannel closed');

    // Attach microphone
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStream.getTracks().forEach(track => pc.addTrack(track, mediaStream));
    console.log('🎤 Microphone attached');

    // Create & send SDP offer
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    // Wait for ICE gathering
    if (pc.iceGatheringState !== 'complete') {
      await new Promise(resolve => {
        pc.addEventListener('icegatheringstatechange', function check() {
          if (pc.iceGatheringState === 'complete') {
            pc.removeEventListener('icegatheringstatechange', check);
            resolve();
          }
        });
      });
    }

    const signalUrl = `https://api.openai.com/v1/realtime?model=${encodeURIComponent(model)}`;
    const signalResp = await fetch(signalUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/sdp',
        'OpenAI-Beta': 'realtime=v1'
      },
      body: pc.localDescription.sdp
    });

    const answer = await signalResp.text();
    if (!signalResp.ok) throw new Error(`Signal failed: ${signalResp.status}`);
    await pc.setRemoteDescription({ type: 'answer', sdp: answer });
    console.log('✅ Remote SDP applied');

    // Update UI controls
    document.getElementById('startButton').disabled       = true;
    document.getElementById('stopButton').disabled        = false;
    document.getElementById('pauseResumeButton').disabled = false;

  } catch (err) {
    console.error('❗ startRecording error:', err);
    updateStatus(`Error: ${err.message}`, 'red');
  }
}

// 3) Stop recording & cleanup
function stopRecording() {
  if (mediaStream) {
    mediaStream.getTracks().forEach(t => t.stop());
    mediaStream = null;
  }
  if (pc) {
    pc.close();
    pc = null;
  }
  updateStatus('Recording stopped.');
  document.getElementById('startButton').disabled       = false;
  document.getElementById('stopButton').disabled        = true;
  document.getElementById('pauseResumeButton').disabled = true;
  isPaused = false;
  document.getElementById('pauseResumeButton').textContent = 'Pause Recording';
}

// Pause / Resume
function togglePauseRecording() {
  if (!pc) return;
  isPaused = !isPaused;
  pc.getSenders().forEach(s => { if (s.track) s.track.enabled = !isPaused; });
  document.getElementById('pauseResumeButton').textContent = isPaused ? 'Resume Recording' : 'Pause Recording';
}
