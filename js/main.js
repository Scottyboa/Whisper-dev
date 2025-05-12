// main.js
// Integrates OpenAI Realtime Session with your existing UI and helpers
import { initTranscribeLanguage } from './languageLoaderUsage.js';
import { initNoteGeneration } from './noteGeneration.js';
import { Session } from './session.js';

let sessionInstance = null;

document.addEventListener('DOMContentLoaded', () => {
  console.log('main.js loaded');

  // Initialize other parts of your UI
  initTranscribeLanguage();
  initNoteGeneration();

  // Grab UI elements
  const startBtn = document.getElementById('startButton');
  const stopBtn = document.getElementById('stopButton');
  const pauseBtn = document.getElementById('pauseResumeButton');
  const out = document.getElementById('transcription');
  const status = document.getElementById('statusMessage');

  console.log('UI elements:', { startBtn, stopBtn, pauseBtn, out, status });
  if (!startBtn || !stopBtn || !out || !status) {
    console.error('One or more required UI elements not found.');
    return;
  }

  // Initial state
  startBtn.disabled = false;
  stopBtn.disabled = true;
  if (pauseBtn) pauseBtn.disabled = true;

  // Handle Start
  startBtn.addEventListener('click', async () => {
    console.log('Start clicked');
    startBtn.disabled = true;
    stopBtn.disabled = false;
    out.value = '';
    status.textContent = 'Initializing...';
    status.style.color = 'blue';

    try {
      const apiKey = sessionStorage.getItem('user_api_key');
      sessionInstance = new Session(apiKey);

      sessionInstance.onopen = () => {
        console.log('Session opened');
        status.textContent = 'Recording… speak now.';
        status.style.color = 'green';
      };
      sessionInstance.onmessage = (msg) => {
        console.log('Session message:', msg);
        if (msg.type === 'transcript' && msg.data?.text) {
          out.value += msg.data.text + '\n';
          out.scrollTop = out.scrollHeight;
        }
      };
      sessionInstance.onerror = (err) => {
        console.error('Session error:', err);
        status.textContent = 'Error: ' + err.message;
        status.style.color = 'red';
      };

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      await sessionInstance.startTranscription(stream, {
        input_audio_transcription: { model: 'gpt-4o-transcribe', language: 'en' }
      });
    } catch (err) {
      console.error('Start failed:', err);
      status.textContent = 'Failed to start: ' + err.message;
      status.style.color = 'red';
      startBtn.disabled = false;
      stopBtn.disabled = true;
    }
  });

  // Handle Stop
  stopBtn.addEventListener('click', () => {
    console.log('Stop clicked');
    stopBtn.disabled = true;
    startBtn.disabled = false;
    sessionInstance?.stop();
    status.textContent = 'Transcription finished.';
    status.style.color = 'blue';
    if (pauseBtn) pauseBtn.disabled = true;
  });
});
