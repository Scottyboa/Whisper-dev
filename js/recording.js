// root/js/recording.js

const API_BASE = "https://api.openai.com";
const SESSION_URL = `${API_BASE}/v1/realtime/transcription_sessions`;
const REALTIME_URL = `${API_BASE}/v1/realtime`;

export function initRecording() {
  const startBtn = document.getElementById('startButton');
  const stopBtn = document.getElementById('stopButton');
  const statusMsg = document.getElementById('statusMessage');
  const transcriptArea = document.getElementById('transcription');

  let pc = null;
  let dc = null;
  let stream = null;
  let sessionId = null;
  let clientSecret = null;

  // Initial button state
  startBtn.disabled = false;
  stopBtn.disabled = true;

  startBtn.addEventListener('click', startRecording);
  stopBtn.addEventListener('click', stopRecording);

  async function startRecording() {
    // Clear previous transcript
    transcriptArea.value = '';
    updateStatus('Starting…');

    const apiKey = sessionStorage.getItem('user_api_key');
    if (!apiKey) return updateStatus('Error: API key missing');

    // 1️⃣ Get mic stream
    try {
      updateStatus('Accessing microphone…');
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      return updateStatus('Mic error: ' + err.message);
    }

    // 2️⃣ Create session & fetch ephemeral token
    let sessionData;
    try {
      updateStatus('Creating session…');
      const resp = await fetch(SESSION_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'openai-beta': 'realtime-v1',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          input_audio_transcription: { model: 'gpt-4o-transcribe' }
        })
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      sessionData = await resp.json();
      sessionId = sessionData.id;
      clientSecret = sessionData.client_secret.value;
      console.log('Session created', sessionId);
    } catch (err) {
      cleanup();
      return updateStatus('Session error: ' + err.message);
    }

    // 3️⃣ Setup WebRTC with STUN
    pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });
    pc.onicecandidate = evt => console.log('ICE candidate', evt.candidate);
    pc.oniceconnectionstatechange = () => {
      console.log('ICE state:', pc.iceConnectionState);
      updateStatus('ICE: ' + pc.iceConnectionState);
    };
    pc.onconnectionstatechange = () => console.log('PC state:', pc.connectionState);
    pc.ontrack = () => {};

    pc.addTrack(stream.getTracks()[0], stream);

    // 4️⃣ Create data channel
    dc = pc.createDataChannel('oai-events');
    dc.onopen = () => {
      console.log('DataChannel open');
      updateStatus('Connected');
      // signal session connect now that channel is open
      dc.send(JSON.stringify({
        type: 'session.connect',
        session: { id: sessionId, client_secret: clientSecret }
      }));
    };
    dc.onclose = () => console.log('DataChannel closed');
    dc.onmessage = e => handleEvent(JSON.parse(e.data));

    // 5️⃣ Offer/Answer
    try {
      updateStatus('Creating SDP…');
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      console.log('Offer SDP', offer.sdp.split('\n')[0]);

      updateStatus('Exchanging SDP…');
      const sdpResp = await fetch(REALTIME_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${clientSecret}`,
          'Content-Type': 'application/sdp'
        },
        body: pc.localDescription.sdp
      });
      if (!sdpResp.ok) throw new Error(`HTTP ${sdpResp.status}`);
      const answerSdp = await sdpResp.text();
      await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp });
      console.log('Remote SDP applied');
    } catch (err) {
      cleanup();
      return updateStatus('SDP error: ' + err.message);
    }

    // UI toggle
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }

  function handleEvent(msg) {
    switch (msg.type) {
      case 'conversation.item.input_audio_transcription.delta':
        transcriptArea.value = msg.delta.text;
        break;
      case 'conversation.item.audio_transcription.completed':
        transcriptArea.value += msg.data.transcription.text + '\n';
        break;
      case 'session.end':
        updateStatus('Session ended');
        cleanup();
        break;
    }
  }

  function stopRecording() {
    cleanup();
    updateStatus('Stopped');
  }

  function cleanup() {
    dc?.close(); dc = null;
    pc?.close(); pc = null;
    stream?.getTracks().forEach(t => t.stop()); stream = null;
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }

  function updateStatus(text) {
    statusMsg.textContent = text;
  }
}
