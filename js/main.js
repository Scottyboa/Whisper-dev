import { initTranscribeLanguage } from './languageLoaderUsage.js';
// Removed initConsentBanner import since it's no longer needed
// import { initConsentBanner } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize language support for the transcribe page.
  initTranscribeLanguage();

  // Initialize the recording functionality dynamically by provider.
  (async function initRecordingByProvider() {
    const provider = (sessionStorage.getItem('transcribe_provider') || 'openai').toLowerCase();
    try {
      let mod;
      if (provider === 'soniox') {
        mod = await import('./SONIOX_UPDATE.js');
      } else {
        mod = await import('./recording.js');
      }
      if (mod && typeof mod.initRecording === 'function') {
        mod.initRecording();
      } else {
        console.error('Selected recording module lacks initRecording()');
      }
    } catch (e) {
      console.error('Failed to load recording module for provider:', provider, e);
    }
  })();

  // Phase 3: Initialize note generation based on note_provider.
  (async function initNoteByProvider() {
    const choice = (sessionStorage.getItem('note_provider') || 'gpt5').toLowerCase();
    // Map dropdown choice → module path
    const path = choice === 'gpt4'
      ? './noteGeneration.js'
      // file name contains a space; encode it for module import on static hosts
      : './notegeneration%20gpt-5.js';
    try {
      const mod = await import(path);
      if (mod && typeof mod.initNoteGeneration === 'function') {
        mod.initNoteGeneration();
      } else {
        console.warn(`Module ${path} missing initNoteGeneration(); falling back to GPT-4-latest`);
        const fallback = await import('./noteGeneration.js');
        fallback.initNoteGeneration();
      }
    } catch (e) {
      console.warn(`Failed to load ${path}; falling back to GPT-4-latest`, e);
      const fallback = await import('./noteGeneration.js');
      fallback.initNoteGeneration();
    }
  })();

  // Add hotkey for the "r" key to trigger the "Start Recording" button,
  // but only when not inside an editable text field.
  document.addEventListener('keydown', (event) => {
    const activeElement = document.activeElement;
    // Check if the active element is an input, textarea, or a contentEditable element.
    if (
      activeElement &&
      (activeElement.tagName === 'INPUT' ||
       activeElement.tagName === 'TEXTAREA' ||
       activeElement.isContentEditable)
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
