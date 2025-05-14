// js/recording.js

import Session from './session.js';

// UI elements
const startButton       = document.getElementById('startButton');
const stopButton        = document.getElementById('stopButton');
const pauseResumeButton = document.getElementById('pauseResumeButton');
const statusMessage     = document.getElementById('statusMessage');
const transcriptionTA   = document.getElementById('transcription');

let session     = null;
let mediaStream = null;
let vadTime     = 0;
let isPaused    = false;

/**
 * Wire up your buttons (same as before)
 */
export function initRecording() {
  startButton.onclick       = startRecording;
  stopButton.onclick        = stopRecording;
  pauseResumeButton.onclick = togglePause;
}

/**
 * Your existing Netlify-based token fetcher :contentReference[oaicite:4]{index=4}:contentReference[oaicite:5]{index=5}
 */
async function fetchEphemeralToken() {
  const apiKey = sessionStorage.getItem('user_api_key');
  if (!apiKey) throw new Error('No API key in sessionStorage under "user_api_key"');

  const resp = await fetch('/.netlify/functions/get-token', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ userKey: apiKey })
  });
  const body = await resp.json();
  if (!resp.ok) throw new Error(`Token fetch failed: ${resp.status}`);
  const { token } = body;
  if (!token) throw new Error('Invalid token payload');
  return token;
}

/**
 * Convenience UI helpers
 */
function updateStatus(msg, color = '#333') {
  statusMessage.textContent = msg;
  statusMessage.style.color = color;
}

function appendTranscript(text) {
  transcriptionTA.value += text + ' ';
  transcriptionTA.scrollTop = transcriptionTA.scrollHeight;
}

/**
 * Handle all incoming real-time events from the OpenAI Session
 */
function handleSessionMessage(parsed) {
  switch (parsed.type) {
    case 'transcription_session.created':
      // no client action needed here
      break;

    case 'input_audio_buffer.speech_started':
      appendTranscript('…');
      break;

    case 'input_audio_buffer.speech_stopped':
      appendTranscript('***');
      // compensate for server VAD silence automatically
      vadTime = performance.now() - 2500;
      break;

    case 'conversation.item.input_audio_transcription.completed':
      const latency = (performance.now() - vadTime).toFixed(0);
      appendTranscript(parsed.transcript);
      console.log(`Latency: ${latency}ms`);
      break;

    default:
      // ignore other events
      break;
  }
}

/**
 * Start → get token → open mic → kick off Session.startTranscription()
 */
async function startRecording() {
  transcriptionTA.value = '';             // clear previous text
  updateStatus('Initializing…');

  try {
    const token = await fetchEphemeralToken();

    // Create & wire up Session (from session.js)
    session = new Session(token);
    session.onconnectionstatechange = state => updateStatus(state, 'green');
    session.onmessage                = handleSessionMessage;
    session.onerror                  = e     => updateStatus(`Error: ${e.message}`, 'red');

    // Grab the microphone
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Start real-time transcription with the same parameters as the working example :contentReference[oaicite:6]{index=6}:contentReference[oaicite:7]{index=7}
    await session.startTranscription(mediaStream, {
      input_audio_transcription: {
        model: 'gpt-4o-transcribe'
      },
      turn_detection: {
        type:                'server_vad',
        threshold:           0.3,
        prefix_padding_ms:   700,
        silence_duration_ms: 2500
      }
    });

    // Update buttons & status
    startButton.disabled       = true;
    stopButton.disabled        = false;
    pauseResumeButton.disabled = false;
    updateStatus('Recording… speak now!', 'green');

  } catch (err) {
    console.error('startRecording error:', err);
    updateStatus(`Error: ${err.message}`, 'red');
  }
}

/**
 * Stop everything & reset UI (same as before)
 */
function stopRecording() {
  if (mediaStream) {
    mediaStream.getTracks().forEach(t => t.stop());
    mediaStream = null;
  }
  session?.stop();
  session = null;

  startButton.disabled        = false;
  stopButton.disabled         = true;
  pauseResumeButton.disabled  = true;
  isPaused                    = false;
  pauseResumeButton.textContent = 'Pause Recording';
  updateStatus('Recording stopped.', '#333');
}

/**
 * Toggle pause/resume by muting the Session
 */
function togglePause() {
  if (!session) return;
  isPaused = !isPaused;
  session.mute(isPaused);
  pauseResumeButton.textContent = isPaused
    ? 'Resume Recording'
    : 'Pause Recording';
  updateStatus(isPaused ? 'Paused' : 'Recording…', isPaused ? 'orange' : 'green');
}
