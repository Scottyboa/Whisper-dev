// root/js/recording.js

import { Session } from './session.js';

const startButton        = document.getElementById('startButton');
const stopButton         = document.getElementById('stopButton');
const pauseResumeButton  = document.getElementById('pauseResumeButton');
const recordTimerEl      = document.getElementById('recordTimer');
const transcribeTimerEl  = document.getElementById('transcribeTimer');
const transcriptionEl    = document.getElementById('transcription');
const statusMessageEl    = document.getElementById('statusMessage');

let session             = null;
let mediaStream         = null;
let isPaused            = false;
let recordTimerInterval = null;
let transcribeTimerInterval = null;
let recordStartTime     = 0;
let transcribeStartTime = 0;

/**
 * Initialize button handlers
 */
export function initRecording() {
  startButton.onclick       = startRecording;
  stopButton.onclick        = stopRecording;
  pauseResumeButton.onclick = togglePauseResume;
  updateButtons(false);
  statusMessageEl.textContent = 'Welcome! Click "Start Recording" to begin.';
}

/**
 * Enable/disable buttons based on recording state
 */
function updateButtons(recording) {
  startButton.disabled      = recording;
  stopButton.disabled       = !recording;
  pauseResumeButton.disabled= !recording;
  pauseResumeButton.textContent = 'Pause Recording';
  isPaused = false;
}

/**
 * Kick off a new recording + transcription session
 */
async function startRecording() {
  const apiKey = sessionStorage.getItem('openai-api-key');
  if (!apiKey) {
    statusMessageEl.textContent = 'Error: API key not found in sessionStorage.';
    return;
  }

  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (err) {
    statusMessageEl.textContent = 'Could not access microphone.';
    return;
  }

  // Reset UI & timers
  transcriptionEl.value    = '';
  recordStartTime          = Date.now();
  clearInterval(transcribeTimerInterval);
  transcribeStartTime      = 0;
  recordTimerEl.textContent    = 'Recording Timer: 0 sec';
  transcribeTimerEl.textContent= 'Completion Timer: 0 sec';
  recordTimerInterval      = setInterval(updateRecordTimer, 1000);

  // Start OpenAI session
  session = new Session(apiKey);
  session.onconnectionstatechange = state => {
    statusMessageEl.textContent = state;
  };
  session.onmessage = handleMessage;
  session.onerror   = e => {
    console.error(e);
    statusMessageEl.textContent = 'Error: ' + e.message;
    stopRecording();
  };

  // Hard-coded defaults: GPT-4-based transcription + server_vad
  const config = {
    input_audio_transcription: { model: 'gpt-4o-transcribe' },
    turn_detection:           { type:  'server_vad'      }
  };

  updateButtons(true);
  await session.startTranscription(mediaStream, config);
}

/**
 * Stop everything and clear intervals
 */
function stopRecording() {
  updateButtons(false);
  session?.stop();
  session = null;

  if (mediaStream) {
    mediaStream.getTracks().forEach(t => t.stop());
    mediaStream = null;
  }

  clearInterval(recordTimerInterval);
  clearInterval(transcribeTimerInterval);
}

/**
 * Toggle pause/resume by muting the Session
 */
function togglePauseResume() {
  if (!session) return;
  if (!isPaused) {
    session.mute(true);
    pauseResumeButton.textContent = 'Resume Recording';
    isPaused = true;
  } else {
    session.mute(false);
    pauseResumeButton.textContent = 'Pause Recording';
    isPaused = false;
  }
}

/**
 * Append completed transcripts and kick off completion timer
 */
function handleMessage(parsed) {
  if (parsed.type === 'conversation.item.input_audio_transcription.completed') {
    // Append text + newline
    transcriptionEl.value += parsed.transcript + '\n';
    transcriptionEl.scrollTop = transcriptionEl.scrollHeight;

    // Start completion timer on first transcript
    if (!transcribeStartTime) {
      transcribeStartTime = Date.now();
      transcribeTimerInterval = setInterval(updateTranscribeTimer, 1000);
    }
  }
}

/** Update the recording timer every second */
function updateRecordTimer() {
  const secs = Math.floor((Date.now() - recordStartTime) / 1000);
  recordTimerEl.textContent = `Recording Timer: ${secs} sec`;
}

/** Update the completion timer every second */
function updateTranscribeTimer() {
  const secs = Math.floor((Date.now() - transcribeStartTime) / 1000);
  transcribeTimerEl.textContent = `Completion Timer: ${secs} sec`;
}
