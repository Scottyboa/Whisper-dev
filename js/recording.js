/* root/js/recording.js */
import { Session } from './session.js';

// DOM element references (your custom IDs)
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const pauseResumeButton = document.getElementById('pauseResumeButton');
const transcriptionEl = document.getElementById('transcription');
const statusMessageEl = document.getElementById('statusMessage');
const recordTimerEl = document.getElementById('recordTimer');
const transcribeTimerEl = document.getElementById('transcribeTimer');

// State variables
let session = null;
let recordInterval = null;
let recordStartTime = 0;
let isPaused = false;

/**
 * Wire up buttons and initialize UI state
 */
export function initRecording() {
  startButton.onclick = startRecording;
  stopButton.onclick = stopRecording;
  pauseResumeButton.onclick = togglePause;
  updateUI(false);
}

/**
 * Enable/disable UI controls
 */
function updateUI(isRecording) {
  startButton.disabled = isRecording;
  stopButton.disabled = !isRecording;
  pauseResumeButton.disabled = !isRecording;
  pauseResumeButton.textContent = isPaused ? 'Resume Recording' : 'Pause Recording';
  if (!isRecording) pauseResumeButton.textContent = 'Pause Recording';
}

/**
 * Kick off microphone capture and transcription session
 */
async function startRecording() {
  const apiKey = sessionStorage.getItem('user_api_key');
  if (!apiKey) {
    alert('API key not found. Please enter your API key on the index page.');
    return;
  }

  try {
    // 1) Capture audio
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // 2) Initialize OpenAI Session
    session = new Session(apiKey);
    session.onconnectionstatechange = state => updateStatus(state);
    session.onopen = () => updateStatus('Connected');
    session.onmessage = handleMessage;
    session.onerror = err => handleError(err);

    // 3) Reset UI fields and timers
    transcriptionEl.value = '';
    recordStartTime = Date.now();
    recordTimerEl.textContent = 'Recording Timer: 0 sec';
    transcribeTimerEl.textContent = 'Completion Timer: 0 sec';

    // 4) Update recording timer every second
    recordInterval = setInterval(() => {
      const secs = Math.floor((Date.now() - recordStartTime) / 1000);
      recordTimerEl.textContent = `Recording Timer: ${secs} sec`;
    }, 1000);

    // 5) Build config matching developer sample (no DOM selects here)
    const sessionConfig = {
      input_audio_transcription: { model: 'gpt-4o-transcribe' },
      turn_detection: { type: 'server_vad' }
    };

    // 6) Start transcription
    await session.startTranscription(stream, sessionConfig);

    // 7) Transition UI to 'recording' mode
    isPaused = false;
    updateUI(true);
    updateStatus('Initializing');
  } catch (err) {
    console.error('Start error:', err);
    updateStatus('Error starting recording');
  }
}

/**
 * Cleanly stop the session and reset UI
 */
function stopRecording() {
  if (session) {
    session.stop();
    session = null;
  }
  clearInterval(recordInterval);
  updateUI(false);
  updateStatus('Stopped');
}

/**
 * Pause/resume audio sending to the API
 */
function togglePause() {
  if (!session) return;
  isPaused = !isPaused;
  session.mute(isPaused);
  updateUI(true);
  updateStatus(isPaused ? 'Paused' : 'Recording');
}

/**
 * Handle messages from the OpenAI data channel
 */
function handleMessage(parsed) {
  console.log('Received:', parsed);
  switch (parsed.type) {
    case 'transcription_session.created':
      updateStatus('Session created');
      break;
    case 'input_audio_buffer.speech_started':
      appendTranscript('...', true);
      break;
    case 'input_audio_buffer.speech_stopped':
      appendTranscript('***', true);
      break;
    // Developer sample comments out delta to avoid duplicate text
    // case 'conversation.item.input_audio_transcription.delta':
    //   break;
    case 'conversation.item.input_audio_transcription.completed':
      appendTranscript(parsed.transcript, false);
      if (parsed.latencyMs != null) {
        const secs = Math.round(parsed.latencyMs / 1000);
        transcribeTimerEl.textContent = `Completion Timer: ${secs} sec`;
      }
      break;
    default:
      break;
  }
}

/**
 * Append or finalize transcript lines
 */
function appendTranscript(text, partial) {
  const lastNL = transcriptionEl.value.lastIndexOf('\n');
  const base = transcriptionEl.value.substring(0, lastNL + 1);
  transcriptionEl.value = base + text + (partial ? '' : '\n');
  transcriptionEl.scrollTop = transcriptionEl.scrollHeight;
}

/**
 * Log errors and update UI
 */
function handleError(err) {
  console.error('Transcription error:', err);
  updateStatus('Error: ' + err.message);
  stopRecording();
}

/**
 * Update the status message DOM
 */
function updateStatus(msg) {
  statusMessageEl.textContent = msg;
}
