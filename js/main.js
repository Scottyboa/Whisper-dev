// main.js

import { initTranscribeLanguage } from './languageLoaderUsage.js';
import { initRecording } from './recording.js';
import { initNoteGeneration } from './noteGeneration.js';
import { initConsentBanner, initTranscribeGuideOverlay } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize language support for the transcribe page.
  initTranscribeLanguage();

  // Initialize the recording functionality.
  initRecording();

  // Initialize note generation and custom prompt handling.
  initNoteGeneration();

  // Initialize the consent banner and ad loading.
  initConsentBanner();

  // Initialize the guide overlay for the transcribe page.
  initTranscribeGuideOverlay();

  // Add a hotkey for the "r" key to trigger the "Start Recording" button,
  // but only when not inside an editable field.
  document.addEventListener('keydown', (event) => {
    const activeElement = document.activeElement;
    if (
      activeElement &&
      (activeElement.tagName === 'INPUT' ||
       activeElement.tagName === 'TEXTAREA' ||
       activeElement.isContentEditable)
    ) {
      return;
    }
    if (event.key.toLowerCase() === 'r') {
      const startButton = document.getElementById('startButton');
      if (startButton) {
        startButton.click();
      }
    }
  });
});
