// recording.js
// Real-time transcription via HTTP signaling + WebRTC DataChannel
// — updated to use assistants=v2 session creation and correct DataChannel update shape

export function initRecording() {
  console.log('⚙️ initRecording()');
  document.getElementById('startButton').onclick = startRecording;
  document.getElementById('stopButton').onclick  = stopRecording;
}

let pc = null;
let mediaStream = null;

// UI Helpers
function updateStatus(msg, color = '#333') {
  const el = document.getElementById('statusMessage');
  if (el) {
    el.textContent = msg;
    el.style.color = color;
  }
}

function appendTranscript(text) {
  const ta = document.getElementById('transcription');
  if (!ta) {
    console.warn('⚠️ No #transcription element found');
    return;
  }
  ta.value += text + '\n';
  console.log(`📝 Transcript: ${text}`);
}

// 1) Fetch ephemeral token & sessionId from Netlify function
async function fetchEphemeralToken() {
  console.log('🔑 fetchEphemeralToken()');
  const apiKey = sessionStorage.getItem('user_api_key');
  if (!apiKey) throw new Error('No API key stored in sessionStorage');

  const resp = await fetch('/.netlify/functions/get-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userKey: apiKey })
  });
  const body = await resp.json();
  console.log('💡 get-token response →', body);
  if (!resp.ok) throw new Error(`Token fetch failed: ${resp.status}`);

  const { token, sessionId } = body;
  if (!token || !sessionId) throw new Error('Invalid token payload: missing token or sessionId');
  console.log('✅ Got token & sessionId');
  return { token, sessionId };
}

// 2) Start recording / transcription
async function startRecording() {
  console.log('▶️ startRecording()');
  updateStatus('Initializing…');

  try {
    const { token, sessionId: initialSessionId } = await fetchEphemeralToken();

    // Create PeerConnection
    pc = new RTCPeerConnection();
    console.log('🎧 PeerConnection created');
    pc.onicecandidate             = e => console.log('➿ ICE candidate:', e.candidate);
    pc.oniceconnectionstatechange = () => console.log('➿ ICE connectionState:', pc.iceConnectionState);
    pc.onconnectionstatechange    = () => console.log('🔗 connectionState:', pc.connectionState);
    pc.onsignalingstatechange     = () => console.log('📶 signalingState:', pc.signalingState);
    pc.onicegatheringstatechange  = () => console.log('⌛ iceGatheringState:', pc.iceGatheringState);

    // Create DataChannel
    const dc = pc.createDataChannel('oai-events');
    console.log('📁 DataChannel created:', dc.label);

    // Open handler
    dc.onopen = () => {
      console.log('🔓 DC open — waiting for session.created');
    };

    // Message handler
    dc.onmessage = evt => {
      console.log('📨 DC message:', evt.data);
      let msg;
      try { msg = JSON.parse(evt.data); } catch (e) { return; }

      if (msg.type === 'session.created') {
        const srvId = msg.session.id;
        console.log('📨 session.created →', srvId);

        // Send transcription_session.update with full settings
        const update = {
          type: 'transcription_session.update',
          session: {
            input_audio_transcription: {
              model: 'gpt-4o-mini-transcribe',
              language: 'en',
              prompt: 'Transcribe the incoming audio in real time.'
            },
            turn_detection: {
              type: 'server_vad',
              silence_duration_ms: 300
            }
          }
        };
        console.log('📤 Sending update:', update);
        dc.send(JSON.stringify(update));
        console.log('📤 transcription_session.update sent');
        updateStatus('Recording… speak now!', 'green');
        return;
      }

      if (msg.type === 'transcript') {
        appendTranscript(msg.data.text);
        return;
      }
    };

    dc.onerror = e => console.error('💥 DC error:', e);
    dc.onclose = () => console.log('🔒 DC closed');

    // Attach microphone
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStream.getTracks().forEach(track => pc.addTrack(track, mediaStream));
    console.log('🎤 Mic attached');

    // Create offer
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    console.log('📢 Local SDP set (first lines):\n' + offer.sdp.split('\n').slice(0,5).join('\n') + '\n…');

    // Wait ICE
    if (pc.iceGatheringState !== 'complete') {
      await new Promise(resolve => {
        const listener = () => pc.iceGatheringState === 'complete' && resolve();
        pc.addEventListener('icegatheringstatechange', listener);
      });
    }
    console.log('✅ ICE gathering complete');

    // Signal via HTTP
    const url = `https://api.openai.com/v1/realtime?model=${encodeURIComponent('gpt-4o-mini-transcribe')}`;
    console.log(`📡 Sending SDP to ${url}`);
    const signalResp = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type':  'application/sdp',
        'OpenAI-Beta':   'realtime=v1'
      },
      body: pc.localDescription.sdp
    });
    const answer = await signalResp.text();
    if (!signalResp.ok) throw new Error(`Signal error: ${signalResp.status}`);
    console.log('🎯 Received answer SDP (first lines):\n' + answer.split('\n').slice(0,5).join('\n') + '\n…');
    await pc.setRemoteDescription({ type: 'answer', sdp: answer });

  } catch (err) {
    console.error('❗ startRecording error:', err);
    updateStatus(`Error: ${err.message}`, 'red');
  }
}

// 3) Stop recording
function stopRecording() {
  console.log('⏹️ stopRecording()');
  mediaStream?.getTracks().forEach(t => t.stop());
  pc?.close();
  pc = null;
  updateStatus('Recording stopped.', '#333');
}
