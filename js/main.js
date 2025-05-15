// main.js
import { initTranscribeLanguage } from './languageLoaderUsage.js';
import { initRecording } from './recording.js';
import { initNoteGeneration } from './noteGeneration.js';

// Initialize recording on its own listener
import { initRecording as initRecordingModule } from './recording.js';

document.addEventListener('DOMContentLoaded', () => {
  initRecordingModule();
});

// Existing initialization
document.addEventListener('DOMContentLoaded', () => {
  initTranscribeLanguage();   // your language selector setup
  initRecording();            // speech-to-text (“Start/Pause/Stop”) hooks
  initNoteGeneration();       // your note-gen feature

  // Add hotkey for the "r" key to trigger the "Start Recording" button,
  // but only when not inside an editable text field.
  document.addEventListener('keydown', (event) => {
    const activeElement = document.activeElement;
    // Check if the active element is an input, textarea, or a contentEditable element.
    if (
      activeElement.tagName === 'INPUT' ||
      activeElement.tagName === 'TEXTAREA' ||
      activeElement.isContentEditable
    ) {
      return;
    }
    // Check if the pressed key is "r" (case-insensitive).
    if (event.key.toLowerCase() === 'r') {
      const startButton = document.getElementById('startButton');
      if (startButton) {
        startButton.click();
      }
    }
  });
});
