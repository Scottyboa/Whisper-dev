// recording.js
// Implements real-time transcription via HTTP signaling and WebRTC DataChannel
// — with detailed debug logging and fixed element IDs.

export function initRecording() {
  console.log('⚙️ initRecording()');
  document.getElementById('startButton').onclick = startRecording;
  document.getElementById('stopButton').onclick = stopRecording;
}

let pc = null;
let mediaStream = null;

// UI Helpers
function updateStatus(message, color = '#333') {
  const statusElem = document.getElementById('statusMessage');
  if (statusElem) {
    statusElem.textContent = message;
    statusElem.style.color = color;
  }
  console.log(`🛈 Status: ${message}`);
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

// Fetch ephemeral token & sessionId from Netlify function
async function fetchEphemeralToken() {
  console.log('🔑 fetchEphemeralToken()');
  const apiKey = sessionStorage.getItem('user_api_key');
  if (!apiKey) throw new Error('No API key in sessionStorage under "user_api_key"');

  const resp = await fetch('/.netlify/functions/get-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userKey: apiKey })
  });
  const raw = await resp.json();
  console.log('💡 get-token response →', raw);

  if (!resp.ok) throw new Error(`Token fetch failed: ${JSON.stringify(raw)}`);
  const { token, sessionId } = raw;
  if (!token || !sessionId) {
    throw new Error(`Invalid token payload: ${JSON.stringify(raw)}`);
  }
  console.log(`✅ Got token & sessionId`);
  return { token, sessionId };
}

// Start recording: use HTTP signaling instead of WebSocket
async function startRecording() {
  console.log('▶️ startRecording()');
  updateStatus('Initializing…');
  try {
    const { token, sessionId } = await fetchEphemeralToken();

    // 1) Create RTCPeerConnection & DataChannel
    pc = new RTCPeerConnection();
    pc.onicecandidate = (evt) => {
      console.log('➿ ICE candidate:', evt.candidate);
    };
    console.log('🎧 PeerConnection created');

    const dc = pc.createDataChannel('oai-events');
    dc.onopen  = () => console.log('🔗 DataChannel open');
    dc.onclose = () => console.log('❌ DataChannel closed');
    dc.onerror = (e) => console.error('💥 DataChannel error:', e);
    dc.onmessage = (evt) => {
      try {
        const msg = JSON.parse(evt.data);
        if (msg.type === 'transcript') {
          appendTranscript(msg.data.text);
        } else {
          console.log('📨 DC message:', msg);
        }
      } catch (err) {
        console.error('⚠️ Failed to parse DC message:', evt.data, err);
      }
    };

    // 2) Hook up the mic
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStream.getTracks().forEach(track => pc.addTrack(track, mediaStream));
    console.log('🎤 Microphone stream attached');

    // 3) Create & set the local SDP offer
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    console.log('📢 SDP offer created & set:', offer.sdp);

    // 4) Wait for ICE gathering to complete
    if (pc.iceGatheringState !== 'complete') {
      console.log('⌛ Waiting for ICE gathering…');
      await new Promise(resolve => {
        function checkState() {
          if (pc.iceGatheringState === 'complete') {
            pc.removeEventListener('icegatheringstatechange', checkState);
            resolve();
          }
        }
        pc.addEventListener('icegatheringstatechange', checkState);
      });
      console.log('✅ ICE gathering complete');
    }

    // 5) Signal via HTTP
    const signalUrl = 'https://api.openai.com/v1/realtime';
    console.log('📡 Signaling to OpenAI…');
    const signalResp = await fetch(signalUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type':  'application/sdp'
      },
      body: pc.localDescription.sdp
    });
    const answerSdp = await signalResp.text();
    if (!signalResp.ok) {
      console.error('❌ Signal error:', signalResp.status, signalResp.statusText, answerSdp);
      throw new Error(`Failed to signal SDP: ${signalResp.status}`);
    }
    console.log('🎯 Received SDP answer:', answerSdp);

    // 6) Apply the SDP answer
    await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp });
    console.log('✅ Remote SDP applied');

    updateStatus('Recording… speak now!', 'green');

  } catch (err) {
    console.error('❗ startRecording error:', err);
    updateStatus(`Error: ${err.message}`, 'red');
  }
}

// Stop recording: clean up
function stopRecording() {
  console.log('⏹️ stopRecording()');
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
    mediaStream = null;
  }
  if (pc) {
    pc.close();
    pc = null;
  }
  updateStatus('Recording stopped.', '#333');
}
