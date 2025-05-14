// recording.js
// Real-time transcription via HTTP signaling + WebRTC DataChannel
// — includes model selection, beta header, session_update, and full debug logging.

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
  // append with a space (not a newline)
  ta.value += text + ' ';
  // auto-scroll to bottom so you always see the latest
  ta.scrollTop = ta.scrollHeight;
  console.log(`📝 Transcript: ${text}`);
}

// 1) Fetch ephemeral token & sessionId from your Netlify function
async function fetchEphemeralToken() {
  console.log('🔑 fetchEphemeralToken()');
  const apiKey = sessionStorage.getItem('user_api_key');
  if (!apiKey) throw new Error('No API key in sessionStorage under "user_api_key"');

  const resp = await fetch('/.netlify/functions/get-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userKey: apiKey })
  });
  const body = await resp.json();
  console.log('💡 get-token response →', body);

  if (!resp.ok) throw new Error(`Token fetch failed: ${resp.status}`);
  const { token, sessionId } = body;
  if (!token || !sessionId) throw new Error(`Invalid token payload`);
  console.log('✅ Got token & sessionId');
  return { token, sessionId };
}

// 2) Start recording / transcription
async function startRecording() {
  console.log('▶️ startRecording()');
 const model = 'gpt-4o-transcribe';

  // ← Clear previous transcription output
  const transcriptionField = document.getElementById('transcription');
  if (transcriptionField) {
    transcriptionField.value = '';
  }

  updateStatus('Initializing…');

  try {
        const { token, sessionId } = await fetchEphemeralToken();
  

    // — Create PeerConnection
    pc = new RTCPeerConnection();
    console.log('🎧 PeerConnection created');

    // — Debug hooks
    pc.onicecandidate             = e => console.log('➿ ICE candidate:', e.candidate);
    pc.oniceconnectionstatechange = () => console.log('➿ ICE connectionState:', pc.iceConnectionState);
    pc.onconnectionstatechange    = () => console.log('🔗 connectionState:', pc.connectionState);
    pc.onsignalingstatechange     = () => console.log('📶 signalingState:', pc.signalingState);
    pc.onicegatheringstatechange  = () => console.log('⌛ iceGatheringState:', pc.iceGatheringState);

    // — Create DataChannel
    const dc = pc.createDataChannel('oai-events');
    console.log('📁 DataChannel created:', dc.label);

    let sessionUpdated = false;

    dc.onopen = () => {
      console.log('🔓 DC open (readyState=', dc.readyState, ')');
    };

    // Unified handler for transcript events
    dc.onmessage = evt => {
      console.log('📨 DC message event:', evt.data);
      let msg;
      try {
        msg = JSON.parse(evt.data);
      } catch (e) {
        console.error('⚠️ DC parse failed:', e);
        return;
      }

      switch (msg.type) {
                case 'session.created':
          if (!sessionUpdated) {
            // update to use only gpt-4o-transcribe (no preview)
            const controlMsg = {
              type: 'session.update',
              session: {
                input_audio_format: 'pcm16',
                input_audio_transcription: {
                  model,
                  // optionally stream partials:
                  streaming: { partials: true }
                },
                turn_detection: {
                  type: 'server_vad',
                  threshold: 0.3,
                  prefix_padding_ms: 700,
                  silence_duration_ms: 2500
                }
              }
            };
            console.log('→ Sending session.update:', controlMsg);
            dc.send(JSON.stringify(controlMsg));
            sessionUpdated = true;
          }
          break;

        case 'session.updated':
          console.log('✅ Session updated, ready for transcription');
          break;

        // Final transcription text
        case 'conversation.item.input_audio_transcription.completed':
          appendTranscript(msg.transcript);
          break;

        // Fallback for older 'transcript' events
        case 'transcript':
          appendTranscript(msg.data.text);
          break;

        default:
          // ignore other event types (speech_started, committed, response.* etc.)
          break;
      }
    };

    // errors & close
    dc.onerror = err => console.error('💥 DC error:', err);
    dc.onclose = () => console.log('🔒 DC closed (readyState=', dc.readyState, ')');

    // — (Optional) SCTP state logging
    if (pc.sctp) {
      console.log('⚡ SCTP available!');
      pc.sctp.onstatechange = () => console.log('⛓️ SCTP state:', pc.sctp.state);
    }

    // — Attach microphone
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStream.getTracks().forEach(track => pc.addTrack(track, mediaStream));
    console.log('🎤 Mic attached');

    // — Create & set local SDP offer
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    console.log('📢 Local SDP set (first lines):\n' +
      offer.sdp.split('\n').slice(0,5).join('\n') + '\n…');

    // — Wait for ICE gathering to complete
    if (pc.iceGatheringState !== 'complete') {
      await new Promise(resolve => {
        const check = () => {
          console.log('⌛ waiting, iceGatheringState=', pc.iceGatheringState);
          if (pc.iceGatheringState === 'complete') {
            pc.removeEventListener('icegatheringstatechange', check);
            resolve();
          }
        };
        pc.addEventListener('icegatheringstatechange', check);
      });
    }
    console.log('✅ ICE gathering complete');

    // — Signal to OpenAI with model & beta header
    const model     = 'gpt-4o-transcribe';  // ← choose your realtime-transcribe model
    const signalUrl = `https://api.openai.com/v1/realtime?model=${encodeURIComponent(model)}`;
    console.log(`📡 Sending SDP to ${signalUrl}`);

    const signalResp = await fetch(signalUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type':  'application/sdp',
        'OpenAI-Beta':  'realtime=v1'
      },
      body: pc.localDescription.sdp
    });

    const answer = await signalResp.text();
    console.log('🎯 Received answer SDP (first lines):\n' +
      answer.split('\n').slice(0,5).join('\n') + '\n…');

    if (!signalResp.ok) {
      console.error('❌ Signal error:', signalResp.status, answer);
      throw new Error(`Signal failed: ${signalResp.status}`);
    }

    // — Apply remote SDP
    await pc.setRemoteDescription({ type: 'answer', sdp: answer });
    console.log('✅ Remote SDP applied');
    console.log('⏯️ DC readyState now:', dc.readyState);

    updateStatus('Recording… speak now!', 'green');
   // Enable Stop & Pause, disable Start
   document.getElementById('startButton').disabled       = true;
   document.getElementById('stopButton').disabled        = false;
   document.getElementById('pauseResumeButton').disabled = false

  } catch (err) {
    console.error('❗ startRecording error:', err);
    updateStatus(`Error: ${err.message}`, 'red');
  }
}

// 3) Stop recording / cleanup
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
  // Reset buttons & pause state
  document.getElementById('startButton').disabled        = false;
  document.getElementById('stopButton').disabled         = true;
  document.getElementById('pauseResumeButton').disabled  = true;
  isPaused = false;
  document.getElementById('pauseResumeButton').textContent = 'Pause Recording';
}
