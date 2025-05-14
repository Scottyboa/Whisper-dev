// transcription.js
import { Session } from './session.js';

let session = null;
let sessionConfig = null;
let recordInterval = null;
let vadTime = 0;

export function initTranscription() {
  const startBtn = document.getElementById('startButton');
  const stopBtn = document.getElementById('stopButton');
  const pauseBtn = document.getElementById('pauseResumeButton');
  const transcriptEl = document.getElementById('transcription');
  const statusEl = document.getElementById('statusMessage');
  const recordTimerEl = document.getElementById('recordTimer');
  const transcribeTimerEl = document.getElementById('transcribeTimer');

  startBtn.addEventListener('click', startRecording);
  stopBtn.addEventListener('click', stopRecording);
  pauseBtn.addEventListener('click', togglePause);

  function updateButtons(active) {
    startBtn.disabled = active;
    stopBtn.disabled = !active;
    pauseBtn.disabled = !active;
    if (!active) pauseBtn.textContent = 'Pause Recording';
  }

  async function startRecording() {
    // get API key (prompt once, then save)
    let apiKey = localStorage.getItem('openaiApiKey');
    if (!apiKey) {
      apiKey = prompt('Enter your OpenAI API key:');
      if (!apiKey) return alert('API key required');
      localStorage.setItem('openaiApiKey', apiKey);
    }

    const model = 'gpt-4o-transcribe';
    const turnType = 'silence';

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    transcriptEl.value = '';
    statusEl.textContent = 'Connecting…';
    updateButtons(true);

    // start record timer
    const startTs = Date.now();
    recordTimerEl.textContent = 'Recording Timer: 0 sec';
    recordInterval = setInterval(() => {
      recordTimerEl.textContent = `Recording Timer: ${Math.floor((Date.now() - startTs) / 1000)} sec`;
    }, 1000);

    // configure and start session
    session = new Session(apiKey);
    session.onconnectionstatechange = s => statusEl.textContent = `Connection: ${s}`;
    session.onmessage = handleMessage;
    session.onerror = handleError;

    sessionConfig = {
      input_audio_transcription: { model },
      turn_detection: { type: turnType }
    };
    await session.startTranscription(stream, sessionConfig);
  }

  function togglePause() {
    if (!session) return;
    const doMute = pauseBtn.textContent === 'Pause Recording';
    session.mute(doMute);
    pauseBtn.textContent = doMute ? 'Resume Recording' : 'Pause Recording';
  }

  function stopRecording() {
    clearInterval(recordInterval);
    session?.stop();
    session = null;
    updateButtons(false);
    statusEl.textContent = 'Stopped';
  }

  function handleMessage(parsed) {
    let text, isPartial;
    switch (parsed.type) {
      case 'input_audio_buffer.speech_started':
        text = '…'; isPartial = true;
        break;
      case 'input_audio_buffer.speech_stopped':
        text = '***'; isPartial = true;
        vadTime = performance.now() - (sessionConfig.turn_detection.silence_duration_ms || 0);
        break;
      case 'conversation.item.input_audio_transcription.completed':
        text = parsed.transcript; isPartial = false;
        const latency = Math.floor(performance.now() - vadTime);
        transcribeTimerEl.textContent = `Completion Timer: ${latency} ms`;
        break;
      default:
        return;
    }
    // append into textarea
    const lastNL = transcriptEl.value.lastIndexOf('\n');
    transcriptEl.value = transcriptEl.value.slice(0, lastNL + 1) + text + (isPartial ? '' : '\n');
    transcriptEl.scrollTop = transcriptEl.scrollHeight;
  }

  function handleError(err) {
    console.error(err);
    alert('Error: ' + err.message);
    stopRecording();
  }
}
