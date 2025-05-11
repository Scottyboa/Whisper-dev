// recording.js
const $ = document.querySelector.bind(document);
const apiKeyEl        = $('#openai-api-key');
const modelEl         = $('#model');
const promptEl        = $('#prompt');
const turnDetectionEl = $('#turn-detection');
const transcriptEl    = $('#transcript');
const startMicEl      = $('#start-microphone');
const startFileEl     = $('#start-file');
const stopEl          = $('#stop');
const audioEl         = $('#audio-file');
const statusEl        = $('#status');

let session = null, sessionConfig = null, vadTime = 0;

function initState() {
  [apiKeyEl, modelEl, promptEl, turnDetectionEl].forEach(el => {
    const key = el.id === 'openai-api-key' ? el.id : `realtime/transcribe/${el.id}`;
    const val = localStorage.getItem(key);
    if (val) el.value = val;
    el.addEventListener('change', () => localStorage.setItem(key, el.value));
  });
  updateState(false);
}

function updateState(running) {
  [apiKeyEl, modelEl, promptEl, turnDetectionEl, startMicEl, startFileEl].forEach(el => el.disabled = running);
  stopEl.disabled = !running;
  statusEl.textContent = '';
}

async function startMicrophone() {
  if (!apiKeyEl.value) {
    return alert('Please enter your OpenAI API Key first.');
  }
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  await start(stream);
}

function handleFileSelect(e) {
  const file = e.target.files[0];
  if (file) audioEl.src = URL.createObjectURL(file);
  startFile();
}

async function startFile() {
  if (!apiKeyEl.value) {
    return alert('Please enter your OpenAI API Key first.');
  }
  audioEl.currentTime = 0;
  audioEl.onended = () => setTimeout(() => stop(), 3000);
  if (audioEl.readyState !== HTMLMediaElement.HAVE_METADATA) {
    await new Promise(r => audioEl.onloadedmetadata = r);
  }
  const stream = audioEl.captureStream();
  await start(stream);
  await audioEl.play();
}

async function start(stream) {
  updateState(true);
  transcriptEl.value = '';
  session = new Session(apiKeyEl.value);
  session.onconnectionstatechange = s => statusEl.textContent = s;
  session.onmessage            = handleMessage;
  session.onerror              = handleError;

  const config = {
    input_audio_transcription: {
      model:  modelEl.value,
      prompt: promptEl.value || undefined
    },
    turn_detection: {
      type: turnDetectionEl.value
    }
  };
  await session.startTranscription(stream, config);
}

function stop() {
  updateState(false);
  audioEl.pause();
  session?.stop();
  session = null;
}

function handleMessage(msg) {
  switch (msg.type) {
    case "transcription_session.created":
      sessionConfig = msg.session;
      break;
    case "input_audio_buffer.speech_started":
      updateTranscript('.', true);
      break;
    case "input_audio_buffer.speech_stopped":
      updateTranscript('***', true);
      vadTime = performance.now() - sessionConfig.turn_detection.silence_duration_ms;
      break;
    case "conversation.item.input_audio_transcription.completed":
      const latency = (performance.now() - vadTime).toFixed(0);
      updateTranscript(msg.transcript + ` (${latency} ms)`, false);
      break;
  }
}

function updateTranscript(text, partial = false) {
  const lines = transcriptEl.value.split('\n');
  lines[lines.length - (partial ? 1 : 0)] = text;
  transcriptEl.value = lines.join('\n') + (partial ? '' : '\n');
  transcriptEl.scrollTop = transcriptEl.scrollHeight;
}

function handleError(err) {
  console.error(err);
  stop();
}

initState();
