// recording.js
import { Session } from './session.js';

export function initRecording() {
  const startButton          = document.getElementById('startButton');
  const stopButton           = document.getElementById('stopButton');
  const pauseResumeButton    = document.getElementById('pauseResumeButton');
  const transcriptionEl      = document.getElementById('transcription');
  const statusMessage        = document.getElementById('statusMessage');
  const recordTimerEl        = document.getElementById('recordTimer');
  const transcribeTimerEl    = document.getElementById('transcribeTimer');
  const langSelect           = document.getElementById('lang-select-transcribe');

  let session             = null;
  let stream              = null;
  let recordTimerId       = null;
  let transcribeTimerId   = null;
  let recordStartTs       = 0;
  let transcribeStartTs   = 0;
  let isPaused            = false;

  function updateState(started) {
    startButton.disabled       = started;
    stopButton.disabled        = !started;
    pauseResumeButton.disabled = !started;

    if (!started) {
      // reset pause button text & timers
      pauseResumeButton.textContent = 'Pause Recording';
      isPaused = false;
      clearInterval(recordTimerId);
      clearInterval(transcribeTimerId);
      recordTimerEl.textContent     = 'Recording Timer: 0 sec';
      transcribeTimerEl.textContent = 'Completion Timer: 0 sec';
    }
  }

  function updateRecordTimer() {
    const secs = Math.floor((Date.now() - recordStartTs) / 1000);
    recordTimerEl.textContent = `Recording Timer: ${secs} sec`;
  }

  function updateTranscribeTimer() {
    const secs = Math.floor((Date.now() - transcribeStartTs) / 1000);
    transcribeTimerEl.textContent = `Completion Timer: ${secs} sec`;
  }

  async function startRecording() {
    const apiKey = sessionStorage.getItem('user_api_key');
    if (!apiKey) {
      alert('Please set your OpenAI API key before recording.');
      return;
    }

    // clear out old transcript
    transcriptionEl.value = '';
    statusMessage.textContent = 'Initializing microphone…';
    updateState(true);

    // start record timer
    recordStartTs = Date.now();
    recordTimerEl.textContent = 'Recording Timer: 0 sec';
    recordTimerId = setInterval(updateRecordTimer, 500);

    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      statusMessage.textContent = 'Microphone access denied.';
      console.error('getUserMedia error:', err);
      updateState(false);
      return;
    }

    // set up the realtime-transcription session
    session = new Session(apiKey);
    session.onopen = () => {
      statusMessage.textContent = 'Transcription session started.';
      transcribeStartTs = Date.now();
      transcribeTimerEl.textContent = 'Completion Timer: 0 sec';
      transcribeTimerId = setInterval(updateTranscribeTimer, 500);
    };
    session.onmessage = handleMessage;
    session.onerror = (err) => {
      statusMessage.textContent = `Error: ${err.message}`;
      console.error('Session error:', err);
      stopRecording();
    };

    const config = {
      input_audio_transcription: {
        model: 'gpt-4o-transcribe',
        language: langSelect.value
      }
    };

    try {
      await session.startTranscription(stream, config);
    } catch (err) {
      statusMessage.textContent = `Failed to start transcription: ${err.message}`;
      console.error(err);
      stopRecording();
    }
  }

  function handleMessage(parsed) {
    console.log('⟵', parsed);
    let data = null;
    switch (parsed.type) {
      case 'transcription_session.created':
        console.log('Session created:', parsed.session.id);
        break;
      case 'input_audio_buffer.speech_started':
        data = { transcript: '…', partial: true };
        handleTranscript(data);
        break;
      case 'conversation.item.input_audio_transcription.completed':
        data = { transcript: parsed.transcript, partial: false };
        handleTranscript(data);
        break;
      default:
        break;
    }
  }

  function handleTranscript({ transcript, partial }) {
    const lastNL = transcriptionEl.value.lastIndexOf('\n');
    if (lastNL >= 0) {
      transcriptionEl.value = transcriptionEl.value.substring(0, lastNL + 1);
    }
    transcriptionEl.value += transcript;
    if (!partial) {
      transcriptionEl.value += '\n';
    }
    transcriptionEl.scrollTop = transcriptionEl.scrollHeight;
  }

  function togglePause() {
    if (!session) return;
    isPaused = !isPaused;
    session.mute(isPaused);
    pauseResumeButton.textContent = isPaused ? 'Resume Recording' : 'Pause Recording';
    statusMessage.textContent = isPaused ? 'Recording paused.' : 'Recording resumed.';
  }

  function stopRecording() {
    updateState(false);
    statusMessage.textContent = 'Stopping…';
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      stream = null;
    }
    if (session) {
      session.stop();
      session = null;
    }
  }

  startButton.addEventListener('click',    startRecording);
  pauseResumeButton.addEventListener('click', togglePause);
  stopButton.addEventListener('click',     stopRecording);
}
