/* root/js/recording.js */

import { Session } from './session.js';

// UI element references
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const pauseResumeButton = document.getElementById('pauseResumeButton');
const transcriptionEl = document.getElementById('transcription');
const statusMessageEl = document.getElementById('statusMessage');
const recordTimerEl = document.getElementById('recordTimer');
const transcribeTimerEl = document.getElementById('transcribeTimer');

// Recording state
let session = null;
let recordInterval = null;
let recordStartTime = 0;
let isPaused = false;

/**
 * Initialize recording button hooks and UI state
 */
export function initRecording() {
  startButton.onclick = startRecording;
  stopButton.onclick = stopRecording;
  pauseResumeButton.onclick = togglePause;
  updateUI(false);
}

/**
 * Update UI controls based on whether recording is active
 */
function updateUI(recording) {
  startButton.disabled = recording;
  stopButton.disabled = !recording;
  pauseResumeButton.disabled = !recording;
  pauseResumeButton.textContent = isPaused ? 'Resume Recording' : 'Pause Recording';
  if (!recording) {
    pauseResumeButton.textContent = 'Pause Recording';
  }
}

/**
 * Start recording and transcription session
 */
async function startRecording() {
  const apiKey = sessionStorage.getItem('user_api_key');
  if (!apiKey) {
    alert('API key not found. Please enter your API key on the index page.');
    return;
  }
  try {
    // Get microphone stream
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Initialize session
    session = new Session(apiKey);
    session.onconnectionstatechange = state => updateStatus(state);
    session.onopen = () => updateStatus('Connected');
    session.onmessage = handleMessage;
    session.onerror = err => handleError(err);

    // Clear previous transcription and timers
    transcriptionEl.value = '';
    recordStartTime = Date.now();
    recordTimerEl.textContent = 'Recording Timer: 0 sec';
    transcribeTimerEl.textContent = 'Completion Timer: 0 sec';

    // Start record timer
    recordInterval = setInterval(updateRecordTimer, 1000);

    // Build session configuration
    const sessionConfig = {
      input_audio_transcription: { model: 'gpt-4o-transcribe' },
      turn_detection: { type: 'server_vad' }
    };

    // Begin transcription
    await session.startTranscription(stream, sessionConfig);

    isPaused = false;
    updateUI(true);
  } catch (err) {
    console.error('Start recording error:', err);
    updateStatus('Error starting recording');
  }
}

/**
 * Stop recording and clean up
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
 * Toggle pause/resume of audio sending
 */
function togglePause() {
  if (!session) return;
  isPaused = !isPaused;
  session.mute(isPaused);
  updateUI(true);
  updateStatus(isPaused ? 'Paused' : 'Recording');
}

/**
 * Update the recording timer display
 */
function updateRecordTimer() {
  const elapsedSec = Math.floor((Date.now() - recordStartTime) / 1000);
  recordTimerEl.textContent = `Recording Timer: ${elapsedSec} sec`;
}

/**
 * Handle incoming messages from the OpenAI session
 */
function handleMessage(parsed) {
  console.log('Message:', parsed);
  switch (parsed.type) {
    case 'transcription_session.created':
      updateStatus('Session created');
      break;
    case 'input_audio_buffer.speech_started':
      updateTranscript('...', true);
      break;
    case 'input_audio_buffer.speech_stopped':
      updateTranscript('***', true);
      break;
    case 'conversation.item.input_audio_transcription.delta':
      updateTranscript(parsed.delta, true);
      break;
    case 'conversation.item.input_audio_transcription.completed':
      updateTranscript(parsed.transcript, false);
      if (parsed.latencyMs !== undefined) {
        const secs = Math.round(parsed.latencyMs / 1000);
        transcribeTimerEl.textContent = `Completion Timer: ${secs} sec`;
      }
      break;
    default:
      break;
  }
}

/**
 * Append or replace transcript in textarea
 */
function updateTranscript(text, partial) {
  const lastNewline = transcriptionEl.value.lastIndexOf('\n');
  const base = transcriptionEl.value.substring(0, lastNewline + 1);
  transcriptionEl.value = base + text + (partial ? '' : '\n');
  transcriptionEl.scrollTop = transcriptionEl.scrollHeight;
}

/**
 * Handle errors from the transcription session
 */
function handleError(err) {
  console.error('Transcription error:', err);
  updateStatus('Error: ' + err.message);
  stopRecording();
}

/**
 * Update status message element
 */
function updateStatus(msg) {
  statusMessageEl.textContent = msg;
}
