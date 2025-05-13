// recording.js
// Real-time transcription via transcription_sessions API + WebRTC DataChannel

export function initRecording() {
  console.log('⚙️ initRecording()');
  document.getElementById('startButton').onclick = startRecording;
  document.getElementById('stopButton').onclick  = stopRecording;
}

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
  if (!ta) {
    console.warn('⚠️ No #transcription element found');
    return;
  }
  ta.value      += text + ' ';
  ta.scrollTop   = ta.scrollHeight;
  console.log(`📝 Transcript: ${text}`);
}

// 1) Fetch transcription token & sessionId from Netlify function
async function fetchTranscriptionToken(sessionConfig) {
  console.log('🔑 fetchTranscriptionToken()');
  const apiKey = sessionStorage.getItem('user_api_key');
  if (!apiKey) throw new Error('No API key in sessionStorage under "user_api_key"');

  const resp = await fetch('/.netlify/functions/get-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userKey: apiKey, ...sessionConfig })
  });
  const body = await resp.json();
  console.log('💡 get-token response →', body);

  if (!resp.ok) throw new Error(`Token fetch failed: ${body.error?.message || resp.status}`);
  const { token, sessionId } = body;
  if (!token || !sessionId) throw new Error(`Invalid token payload`);
  console.log('✅ Got token & sessionId');
  return { token, sessionId };
}

// 2) Start recording / transcription
async function startRecording() {
  console.log('▶️ startRecording()');

  // Clear previous transcription
  const transcriptionField = document.getElementById('transcription');
  if (transcriptionField) transcriptionField.value = '';

  updateStatus('Initializing…');

  try {
    // Define your transcription session config
    const sessionConfig = {
      input_audio_transcription: {
        model: 'gpt-4o-transcribe',
        prompt: ''
      },
      input_audio_format: 'pcm16',
      turn_detection: {
        type: 'server_vad',            // VAD-driven turn detection
        threshold: 0.3,                // sensitivity (0.0–1.0; lower = more noise tolerated)
        prefix_padding_ms: 700,        // ms of audio context before silence cut
        silence_duration_ms: 2500      // ms of sustained silence to mark end of turn
      }
    };

    const { token } = await fetchTranscriptionToken(sessionConfig);

    // Create PeerConnection
    pc = new RTCPeerConnection();
    console.log('🎧 PeerConnection created');

    // DataChannel for events
    dc = pc.createDataChannel('oai-events');
    console.log('📁 DataChannel created');

    dc.onopen = () => updateStatus('Recording… speak now!', 'green');
    dc.onerror = err => console.error('💥 DC error:', err);
    dc.onmessage = evt => {
      let msg;
      try {
        msg = JSON.parse(evt.data);
      } catch {
        return;
      }
      if (msg.type === 'conversation.item.input_audio_transcription.completed') {
        appendTranscript(msg.transcript);
      }
    };
    dc.onclose = () => console.log('🔒 DC closed');

    // Attach mic
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStream.getTracks().forEach(track => pc.addTrack(track, mediaStream));
    console.log('🎤 Mic attached');

    // SDP offer/answer
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    await waitForIceGathering(pc);

    // Signal via transcription session token
    const signalResp = await fetch('https://api.openai.com/v1/realtime', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/sdp'
      },
      body: pc.localDescription.sdp
    });
    if (!signalResp.ok) {
      const errText = await signalResp.text();
      throw new Error(`Signal failed: ${signalResp.status} ${errText}`);
    }
    const answer = await signalResp.text();
    await pc.setRemoteDescription({ type: 'answer', sdp: answer });

    document.getElementById('startButton').disabled       = true;
    document.getElementById('stopButton').disabled        = false;
    console.log('✅ Recording started');

  } catch (err) {
    console.error('❗ startRecording error:', err);
    updateStatus(`Error: ${err.message}`, 'red');
  }
}

// Utility: wait ICE gathering
function waitForIceGathering(pc) {
  if (pc.iceGatheringState === 'complete') return Promise.resolve();
  return new Promise(resolve => {
    pc.addEventListener('icegatheringstatechange', function handler() {
      if (pc.iceGatheringState === 'complete') {
        pc.removeEventListener('icegatheringstatechange', handler);
        resolve();
      }
    });
  });
}

// 3) Stop recording / cleanup
async function stopRecording() {
  console.log('⏹️ stopRecording()');
  if (mediaStream) {
    mediaStream.getTracks().forEach(t => t.stop());
    mediaStream = null;
  }
  // wait for any in-flight transcription
  await new Promise(r => {
    if (!dc) return r();
    dc.onclose = () => r();
    setTimeout(r, 5000);
  });
  if (pc) {
    pc.close();
    pc = dc = null;
  }
  updateStatus('Recording stopped.', '#333');
  document.getElementById('startButton').disabled        = false;
  document.getElementById('stopButton').disabled         = true;
  isPaused = false;
}
