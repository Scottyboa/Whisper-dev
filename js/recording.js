// Real-time transcription via WebSocket API (assistants=v2) for browser-only frontend

export function initRecording() {
  console.log('⚙️ initRecording()');
  document.getElementById('startButton').onclick = startRecording;
  document.getElementById('stopButton').onclick  = stopRecording;
}

let ws = null;
let mediaStream = null;
let audioContext = null;
let processor = null;

// UI helpers
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
  ta.value += text + '
';
  console.log(`📝 Transcript: ${text}`);
}

// fetch ephemeral token
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
  const { token } = body;
  if (!token) throw new Error('Missing token in response');
  return token;
}

// start recording via WebSocket
async function startRecording() {
  console.log('▶️ startRecording()');
  updateStatus('Initializing…');
  try {
    const token = await fetchEphemeralToken();

    // open WebSocket with subprotocols for auth & beta header
    const url = 'wss://api.openai.com/v1/realtime';
    const protocols = [`Bearer ${token}`, 'OpenAI-Beta: realtime=v1'];
    ws = new WebSocket(url, protocols);

    ws.onopen = () => {
      console.log('🔌 WebSocket open');
      // send session update to enable transcription
      const update = {
        type: 'transcription_session.update',
        session: {
          input_audio_transcription: {
            model: 'gpt-4o-mini-transcribe',
            language: 'en',
            prompt: 'Transcribe the incoming audio in real time.'
          },
          turn_detection: { type: 'server_vad', silence_duration_ms: 300 }
        }
      };
      console.log('📤 Sending:', update);
      ws.send(JSON.stringify(update));
      updateStatus('Recording… speak now!', 'green');

      // start mic capture
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        mediaStream = stream;
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        processor = audioContext.createScriptProcessor(4096, 1, 1);
        source.connect(processor);
        processor.connect(audioContext.destination);
        processor.onaudioprocess = e => {
          const input = e.inputBuffer.getChannelData(0);
          const int16 = new Int16Array(input.length);
          for (let i = 0; i < input.length; i++) {
            const s = Math.max(-1, Math.min(1, input[i]));
            int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
          }
          const audioBase64 = btoa(String.fromCharCode(...new Uint8Array(int16.buffer)));
          ws.send(JSON.stringify({ type: 'input_audio_buffer.append', audio: audioBase64 }));
        };
        console.log('🎤 Mic attached');
      }).catch(err => {
        console.error('❌ Mic error:', err);
        updateStatus('Mic error', 'red');
      });
    };

    ws.onmessage = evt => {
      let msg;
      try { msg = JSON.parse(evt.data); } catch { return; }
      if (msg.type === 'conversation.item.input_audio_transcription.delta') {
        appendTranscript(msg.delta);
      } else if (msg.type === 'conversation.item.input_audio_transcription.completed') {
        appendTranscript(msg.transcript);
        console.log('✅ Transcription complete');
      } else if (msg.type === 'input_audio_buffer.speech_stopped') {
        console.log('✋ sound stopped');
        // optionally commit here
        ws.send(JSON.stringify({ type: 'input_audio_buffer.commit' }));
      } else if (msg.type === 'error') {
        console.error('💥 Error event:', msg.error);
      }
    };

    ws.onerror = e => console.error('🔌 WebSocket error:', e);
    ws.onclose = () => console.log('🔌 WebSocket closed');

  } catch (err) {
    console.error('❗ startRecording error:', err);
    updateStatus(`Error: ${err.message}`, 'red');
  }
}

// stop recording
function stopRecording() {
  console.log('⏹️ stopRecording()');
  if (processor) {
    processor.disconnect();
    processor = null;
  }
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
  if (mediaStream) {
    mediaStream.getTracks().forEach(t => t.stop());
    mediaStream = null;
  }
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'input_audio_buffer.commit' }));
    ws.close();
  }
  ws = null;
  updateStatus('Recording stopped.', '#333');
}
