// recording.js
// Real-time transcription via HTTP signaling + WebRTC DataChannel
// — now with full debug logging.

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
  ta.value += text + '\n';
  console.log(`📝 Transcript: ${text}`);
}

// 1) Fetch token/sessionId
async function fetchEphemeralToken() {
  console.log('🔑 fetchEphemeralToken()');
  const apiKey = sessionStorage.getItem('user_api_key');
  if (!apiKey) throw new Error('No API key in sessionStorage');
  const resp = await fetch('/.netlify/functions/get-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userKey: apiKey })
  });
  const body = await resp.json();
  console.log('💡 get-token response →', body);
  if (!resp.ok) throw new Error(`Token fetch failed: ${resp.status}`);
  const { token, sessionId } = body;
  if (!token || !sessionId) throw new Error(`Bad token payload`);
  return { token, sessionId };
}

// 2) Start
async function startRecording() {
  console.log('▶️ startRecording()');
  updateStatus('Initializing…');
  try {
    const { token, sessionId } = await fetchEphemeralToken();

    // — Create PeerConnection
    pc = new RTCPeerConnection();
    console.log('🎧 PeerConnection created');

    // — Debug hooks
    pc.onicecandidate            = e => console.log('➿ ICE candidate:', e.candidate);
    pc.oniceconnectionstatechange= () => console.log('➿ ICE connectionState:', pc.iceConnectionState);
    pc.onconnectionstatechange   = () => console.log('🔗 connectionState:', pc.connectionState);
    pc.onsignalingstatechange    = () => console.log('📶 signalingState:', pc.signalingState);
    pc.onicegatheringstatechange = () => console.log('⌛ iceGatheringState:', pc.iceGatheringState);

    // — DataChannel
    const dc = pc.createDataChannel('oai-events');
    console.log('📁 DataChannel created:', dc.label);
    dc.onopen    = () => console.log('🔓 DC open (readyState=', dc.readyState,')');
    dc.onclose   = () => console.log('🔒 DC closed (readyState=', dc.readyState,')');
    dc.onerror   = err => console.error('💥 DC error:', err);
    dc.onmessage = evt => {
      console.log('📨 DC message event:', evt.data);
      try {
        const msg = JSON.parse(evt.data);
        if (msg.type === 'transcript') appendTranscript(msg.data.text);
      } catch(e) {
        console.error('⚠️ DC parse failed:', e);
      }
    };

    // — SCTP state (if supported)
    if (pc.sctp) {
      console.log('⚡ SCTP available!');
      pc.sctp.onstatechange = () => console.log('⛓️ SCTP state:', pc.sctp.state);
    }

    // — Audio
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStream.getTracks().forEach(t => pc.addTrack(t, mediaStream));
    console.log('🎤 Mic attached');

    // — Offer
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    console.log('📢 Local SDP set:', offer.sdp.split('\n').slice(0,5).join('\n'), '…');

    // — Wait for ICE gather
    if (pc.iceGatheringState !== 'complete') {
      await new Promise(res => {
        const check = () => {
          console.log('⌛ waiting, iceGatheringState=', pc.iceGatheringState);
          if (pc.iceGatheringState === 'complete') {
            pc.removeEventListener('icegatheringstatechange', check);
            res();
          }
        };
        pc.addEventListener('icegatheringstatechange', check);
      });
    }
    console.log('✅ ICE gathering complete');

    // — Signal
    console.log('📡 Sending SDP to OpenAI…');
    const sig = await fetch('https://api.openai.com/v1/realtime', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type':  'application/sdp'
      },
      body: pc.localDescription.sdp
    });
    const answer = await sig.text();
    console.log(`🎯 Received answer SDP (first lines):\n${answer.split('\n').slice(0,5).join('\n')}…`);

    if (!sig.ok) throw new Error(`Signal failed ${sig.status}`);

    // — Apply remote
    await pc.setRemoteDescription({ type: 'answer', sdp: answer });
    console.log('✅ Remote SDP applied');
    console.log('⏯️ DC readyState now:', dc.readyState);

    updateStatus('Recording… speak now!', 'green');
  } catch (err) {
    console.error('❗ startRecording error:', err);
    updateStatus(`Error: ${err.message}`, 'red');
  }
}

// 3) Stop
function stopRecording() {
  console.log('⏹️ stopRecording()');
  if (mediaStream) {
    mediaStream.getTracks().forEach(t => t.stop());
    mediaStream = null;
  }
  if (pc) {
    pc.close();
    pc = null;
  }
  updateStatus('Recording stopped.', '#333');
}
