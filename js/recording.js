// recording.js
// Real-time transcription via HTTP signaling & WebRTC DataChannel
export function initRecording() {
  const startBtn = document.getElementById('startButton');
  const stopBtn  = document.getElementById('stopButton');
  const pauseBtn = document.getElementById('pauseResumeButton');

  if (startBtn) startBtn.onclick = startRecording;
  if (stopBtn)  stopBtn.onclick  = stopRecording;
  if (pauseBtn) {
    pauseBtn.onclick   = togglePause;
    pauseBtn.disabled  = true;
    pauseBtn.textContent = 'Pause Recording';
  }

  if (startBtn) startBtn.disabled = false;
  if (stopBtn)  stopBtn.disabled  = true;
}

let pc = null;
let mediaStream = null;

function updateStatusMessage(msg, color = '#333') {
  const el = document.getElementById('statusMessage');
  if (el) { el.textContent = msg; el.style.color = color; }
}

async function fetchEphemeralToken() {
  const apiKey = sessionStorage.getItem('user_api_key');
  if (!apiKey) throw new Error('API key missing in sessionStorage');
  const resp = await fetch('/.netlify/functions/get-token', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({userKey: apiKey})
  });
  const raw = await resp.json();
  console.log('💡 RAW get-token response →', raw);
  if (!resp.ok) throw new Error(raw.error || JSON.stringify(raw));
  const { token, sessionId } = raw;
  if (typeof token!=='string' || typeof sessionId!=='string') {
    throw new Error(`Invalid token/sessionId shape: ${JSON.stringify(raw)}`);
  }
  return { token, sessionId };
}

async function startRecording() {
  try {
    updateStatusMessage('Getting ephemeral token…','blue');
    const { token, sessionId } = await fetchEphemeralToken();
    console.log('✅ Using token:', token,'sessionId:', sessionId);

    // 1) Create PC & DataChannel
    pc = new RTCPeerConnection();
    const dc = pc.createDataChannel('');
    dc.onopen    = () => updateStatusMessage('Recording… speak now!','green');
    dc.onmessage = evt => {
      console.log('📨 dc message:', evt.data);
      const msg = JSON.parse(evt.data);
      if (msg.type==='transcript' && msg.data?.text) {
        const out = document.getElementById('transcription');
        out.value += msg.data.text+'\n';
        out.scrollTop = out.scrollHeight;
      }
    };

    // 2) Mic
    mediaStream = await navigator.mediaDevices.getUserMedia({audio:true});
    mediaStream.getTracks().forEach(t=>pc.addTrack(t,mediaStream));

    // 3) Offer
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    // 4) ── WAIT FOR ICE GATHERING (or 5 s timeout)
    await Promise.race([
      new Promise(res=>{
        if (pc.iceGatheringState==='complete') return res();
        function chk(){ if(pc.iceGatheringState==='complete'){
            pc.removeEventListener('icegatheringstatechange',chk);
            res();
        }}
        pc.addEventListener('icegatheringstatechange',chk);
      }),
      new Promise(res=>setTimeout(res,5000))
    ]);

    // DEBUG: log out local SDP to confirm ICE candidates are present
    console.log('📝 localDescription after ICE:', pc.localDescription.sdp);

    // 5) Signal via HTTP (include session_id)
    const resp = await fetch(
      `https://api.openai.com/v1/realtime?session_id=${sessionId}`,
      {
        method:'POST',
        headers:{
          'Authorization':`Bearer ${token}`,
          'Content-Type':'application/sdp'
        },
        body:pc.localDescription.sdp
      }
    );
    console.log('🚀 signal status:', resp.status);
    const answer = await resp.text();
    console.log('🚀 signal answer SDP:', answer);
    if (!resp.ok) throw new Error(`Signal failed: ${resp.status}`);

    // 6) Remote description
    await pc.setRemoteDescription({type:'answer', sdp:answer});
    console.log('🔄 remoteDescription set');

    // 7) UI toggles
    document.getElementById('startButton').disabled = true;
    document.getElementById('stopButton').disabled  = false;
    const pauseBtn = document.getElementById('pauseResumeButton');
    if (pauseBtn) pauseBtn.disabled = false;

  } catch(err) {
    console.error('startRecording error:', err);
    updateStatusMessage(`Error: ${err.message}`,'red');
    document.getElementById('startButton').disabled = false;
  }
}

function stopRecording() {
  if (pc) { pc.close(); pc = null; }
  if (mediaStream) {
    mediaStream.getTracks().forEach(t=>t.stop());
    mediaStream = null;
  }
  document.getElementById('startButton').disabled = false;
  document.getElementById('stopButton').disabled  = true;
  const pauseBtn = document.getElementById('pauseResumeButton');
  if (pauseBtn) {
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause Recording';
  }
  updateStatusMessage('Transcription finished!','blue');
}

function togglePause() {
  const pauseBtn = document.getElementById('pauseResumeButton');
  if (!pc || !pauseBtn) return;
  const pausing = pauseBtn.textContent==='Pause Recording';
  pc.getSenders().forEach(s => {
    if (s.track?.kind==='audio') s.track.enabled = !pausing;
  });
  pauseBtn.textContent = pausing ? 'Resume Recording' : 'Pause Recording';
}
