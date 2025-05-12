// main.js
// Integrates the OpenAI Realtime Session with your existing UI and helpers
import { initTranscribeLanguage } from './languageLoaderUsage.js';
import { initNoteGeneration } from './noteGeneration.js';
import { Session } from './session.js'; // demo's session implementation

let sessionInstance = null;

document.addEventListener('DOMContentLoaded', () => {
  // Initialize language support and note generation
  initTranscribeLanguage();
  initNoteGeneration();

  const startBtn = document.getElementById('startButton');
  const stopBtn  = document.getElementById('stopButton');
  const pauseBtn = document.getElementById('pauseResumeButton');
  const out      = document.getElementById('transcription');
  const status   = document.getElementById('statusMessage');

  // Hotkey for 'r' to start recording
  document.addEventListener('keydown', (event) => {
    const ae = document.activeElement;
    if (ae && (ae.tagName==='INPUT' || ae.tagName==='TEXTAREA' || ae.isContentEditable)) return;
    if (event.key.toLowerCase()==='r' && startBtn) startBtn.click();
  });

  // START button handler
  startBtn.onclick = async () => {
    startBtn.disabled = true;
    stopBtn.disabled  = false;
    pauseBtn.disabled = false;
    out.value = '';
    status.textContent = 'Initializing...';

    const apiKey = sessionStorage.getItem('user_api_key');
    if (!apiKey) {
      status.textContent = 'Error: API key missing';
      status.style.color = 'red';
      startBtn.disabled = false;
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      sessionInstance = new Session(apiKey);

      sessionInstance.onopen = () => {
        status.textContent = 'Recording… speak now.';
        status.style.color = 'green';
      };
      sessionInstance.onmessage = (msg) => {
        if (msg.type === 'transcript' && msg.data?.text) {
          out.value += msg.data.text + '\n';
          out.scrollTop = out.scrollHeight;
        }
      };
      sessionInstance.onerror = (err) => {
        console.error(err);
        status.textContent = 'Error: ' + err.message;
        status.style.color = 'red';
      };

      // Start transcription (Whisper-style)
      await sessionInstance.startTranscription(stream, {
        input_audio_transcription: { model: 'gpt-4o-transcribe', language: 'en' }
      });
    } catch (e) {
      console.error(e);
      status.textContent = 'Error: ' + e.message;
      status.style.color = 'red';
      startBtn.disabled = false;
      stopBtn.disabled  = true;
      pauseBtn.disabled = true;
    }
  };

  // STOP button handler
  stopBtn.onclick = () => {
    if (sessionInstance) {
      sessionInstance.stop();
      sessionInstance = null;
    }
    status.textContent = 'Transcription finished.';
    status.style.color = 'blue';
    startBtn.disabled = false;
    stopBtn.disabled  = true;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause Recording';
  };

  // PAUSE/RESUME button handler
  pauseBtn.onclick = () => {
    if (!sessionInstance) return;
    const isPausing = pauseBtn.textContent === 'Pause Recording';
    sessionInstance.togglePause(); // assuming Session provides this
    pauseBtn.textContent = isPausing ? 'Resume Recording' : 'Pause Recording';
  };
});
