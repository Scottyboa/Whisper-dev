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
  let clientSecret = null;

  // Initial button state
  startBtn.disabled = false;
  stopBtn.disabled = true;

  startBtn.addEventListener('click', startRecording);
  stopBtn.addEventListener('click', stopRecording);

  async function startRecording() {
    // Clear previous transcript
    transcriptArea.value = '';
    updateStatus('Starting session…');

    const apiKey = sessionStorage.getItem('user_api_key');
    if (!apiKey) {
      updateStatus('Error: API key missing');
      return;
    }

    // 1️⃣ Access microphone
    try {
      updateStatus('Accessing microphone…');
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      updateStatus('Error accessing mic: ' + err.message);
      return;
    }

    // 2️⃣ Set up RTCPeerConnection and DataChannel
    pc = new RTCPeerConnection();
    pc.onconnectionstatechange = () => updateStatus(pc.connectionState);
    pc.ontrack = () => {};
    pc.addTrack(stream.getTracks()[0], stream);

    dc = pc.createDataChannel('');  // empty label as in example
    dc.onopen = () => updateStatus('DataChannel open');
    dc.onmessage = (e) => handleEvent(JSON.parse(e.data));

    // 3️⃣ Create SDP offer
    updateStatus('Creating SDP offer…');
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    // 4️⃣ Create transcription session & fetch client_secret
    updateStatus('Creating transcription session…');
    let sessionData;
    try {
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
      clientSecret = sessionData.client_secret.value;
    } catch (err) {
      updateStatus('Error creating session: ' + err.message);
      cleanup();
      return;
    }

    // 5️⃣ Exchange SDP with OpenAI
    updateStatus('Exchanging SDP…');
    try {
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
    } catch (err) {
      updateStatus('Error during SDP exchange: ' + err.message);
      cleanup();
      return;
    }

    // 6️⃣ Ready for transcription events
    updateStatus('Transcribing…');
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }

  function handleEvent(msg) {
    switch (msg.type) {
      case 'transcription_session.created':
        // Session is ready on the server
        break;
      case 'conversation.item.input_audio_transcription.delta':
        transcriptArea.value = msg.delta.text || msg.delta;
        break;
      case 'conversation.item.audio_transcription.completed':
        transcriptArea.value += (msg.data?.transcription?.text || msg.transcript) + '\n';
        break;
    }
  }

  function stopRecording() {
    cleanup();
    updateStatus('Stopped');
  }

  function cleanup() {
    if (dc) { dc.close(); dc = null; }
    if (pc) { pc.close(); pc = null; }
    if (stream) { stream.getTracks().forEach(t => t.stop()); stream = null; }
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }

  function updateStatus(text) {
    statusMsg.textContent = text;
  }
}
