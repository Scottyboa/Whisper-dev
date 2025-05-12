// recording.js
// Real-time transcription via WebSocket & OpenAI Realtime API

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

let pc, ws, mediaStream;

// UI helper
function updateStatusMessage(msg, color='#333') {
  const s = document.getElementById('statusMessage');
  if (s) { s.textContent = msg; s.style.color = color; }
}

// Fetch token/session
async function fetchEphemeralToken() {
  const key = sessionStorage.getItem('user_api_key');
  if (!key) throw new Error('No API key in sessionStorage');
  const r = await fetch('/.netlify/functions/get-token', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ userKey: key })
  });
  const j = await r.json();
  console.log('💡 RAW get-token →', j);
  if (!r.ok) throw new Error(j.error||JSON.stringify(j));
  return j; // { token, sessionId }
}

async function startRecording() {
  try {
    updateStatusMessage('Fetching token…','blue');
    const { token, sessionId } = await fetchEphemeralToken();
    console.log('✅ token/session →', token, sessionId);

    // 1) Open WS
    ws = new WebSocket(
      `wss://realtime.openai.com/ws?session_id=${sessionId}&token=${token}`
    );
    ws.onopen = async () => {
      console.log('🔗 WS open');
      updateStatusMessage('WS open, setting up…','blue');

      // 2) Create PC
      pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.openai.com:443' }]
      });
      pc.onconnectionstatechange = () =>
        console.log('🔄 PC connectionState:', pc.connectionState);
      pc.oniceconnectionstatechange = () =>
        console.log('🔄 PC iceConnectionState:', pc.iceConnectionState);

      // 3) Handle incoming WS messages
      ws.onmessage = async evt => {
        const msg = JSON.parse(evt.data);
        console.log('📨 WS msg:', msg.type, msg);
        if (msg.type==='sdp_answer') {
          await pc.setRemoteDescription(msg.data);
          console.log('🔄 Applied SDP answer');
        } else if (msg.type==='ice_candidate') {
          await pc.addIceCandidate(msg.data);
          console.log('🔄 Added ICE candidate');
        } else if (msg.type==='transcript') {
          // Append transcript text
          const out = document.getElementById('transcription');
          out.value += msg.data.text + '\n';
          out.scrollTop = out.scrollHeight;
        }
      };

      // 4) Relay our ICE candidates
      pc.onicecandidate = e => {
        if (!e.candidate) return;
        console.log('🔄 Sending ICE candidate');
        ws.send(JSON.stringify({ type:'ice_candidate', data:e.candidate }));
      };

      // 5) Get mic & add track
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.getTracks().forEach(t => pc.addTrack(t, mediaStream));
      console.log('🎙️ Mic track added');

      // 6) Create & send SDP offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      console.log('📝 Sending SDP offer');
      ws.send(JSON.stringify({ type:'sdp_offer', data:offer }));

      // 7) UI toggle
      updateStatusMessage('Recording… speak now!','green');
      document.getElementById('startButton').disabled = true;
      document.getElementById('stopButton').disabled  = false;
      document.getElementById('pauseResumeButton').disabled = false;
    };

    ws.onerror = e => {
      console.error('WS error', e);
      updateStatusMessage('WebSocket error','red');
    };
    ws.onclose = () => console.log('🔒 WS closed');

  } catch (err) {
    console.error('startRecording failed:', err);
    updateStatusMessage(`Error: ${err.message}`,'red');
  }
}

function stopRecording() {
  if (pc) {
    pc.close(); pc = null;
  }
  if (ws) {
    ws.close(); ws = null;
  }
  if (mediaStream) {
    mediaStream.getTracks().forEach(t => t.stop());
    mediaStream = null;
  }
  updateStatusMessage('Transcription stopped','blue');
  document.getElementById('startButton').disabled = false;
  document.getElementById('stopButton').disabled  = true;
  const p = document.getElementById('pauseResumeButton');
  if (p) { p.disabled = true; p.textContent = 'Pause Recording'; }
}

function togglePause() {
  if (!pc) return;
  const btn = document.getElementById('pauseResumeButton');
  const pausing = btn.textContent==='Pause Recording';
  pc.getSenders().forEach(s => {
    if (s.track?.kind==='audio') s.track.enabled = !pausing;
  });
  btn.textContent = pausing ? 'Resume Recording' : 'Pause Recording';
}
