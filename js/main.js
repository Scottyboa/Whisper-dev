import { initTranscribeLanguage } from './languageLoaderUsage.js';
// Removed initConsentBanner import since it's no longer needed
// import { initConsentBanner } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize language support for the transcribe page.
  initTranscribeLanguage();

  // Simple UI state persistence helpers (used for provider switching & reload fallback).
  const stateKey = "__ui_state_v1";
  function saveState() {
    const grab = (id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      return {
        value: el.value ?? "",
        selStart: el.selectionStart ?? null,
        selEnd: el.selectionEnd ?? null,
        scrollTop: el.scrollTop ?? 0
      };
    };
    const payload = {
      transcription: grab("transcription"),
      generatedNote: grab("generatedNote"),
      customPrompt:  grab("customPrompt"),
      ts: Date.now()
    };
    try { sessionStorage.setItem(stateKey, JSON.stringify(payload)); } catch {}
  }
  function restoreState() {
    let raw = null;
    try { raw = sessionStorage.getItem(stateKey); } catch {}
    if (!raw) return;
    try {
      const s = JSON.parse(raw);
      const put = (id, sObj) => {
        if (!sObj) return;
        const el = document.getElementById(id);
        if (!el) return;
        el.value = sObj.value || "";
        if (typeof sObj.scrollTop === "number") el.scrollTop = sObj.scrollTop;
        // Defer selection so the element is in DOM and sized
        setTimeout(() => {
          if (typeof sObj.selStart === "number" && typeof sObj.selEnd === "number") {
            try { el.setSelectionRange(sObj.selStart, sObj.selEnd); } catch {}
          }
        }, 0);
      };
      put("transcription", s.transcription);
      put("generatedNote", s.generatedNote);
      put("customPrompt",  s.customPrompt);
    } finally {
      try { sessionStorage.removeItem(stateKey); } catch {}
    }
  }

  // Expose small app helpers for provider switching from inline scripts.
  window.__app = window.__app || {};
  window.__app.saveState = saveState;
  window.__app.restoreState = restoreState;

  // Restore any persisted state (e.g., after a fallback reload).
  restoreState();

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

  // Live-switch helpers (used by dropdown handlers in transcribe.html)
  window.__app.switchNoteProvider = async function(next) {
    // Remove old listeners by replacing the button node (fast & safe).
    const btn = document.getElementById('generateNoteButton');
    if (btn) {
      const clone = btn.cloneNode(true);
      btn.parentNode.replaceChild(clone, btn);
    }
    sessionStorage.setItem('note_provider', (next || 'gpt5').toLowerCase());
    // Re-init note module with the new provider
    const choice = (sessionStorage.getItem('note_provider') || 'gpt5').toLowerCase();
    const path = choice === 'gpt4' ? './noteGeneration.js' : './notegeneration%20gpt-5.js';
    try {
      const mod = await import(/* @vite-ignore */ path + `?t=${Date.now()}`);
      if (mod && typeof mod.initNoteGeneration === 'function') {
        mod.initNoteGeneration();
      }
    } catch (e) {
      console.warn('Switch note provider failed, falling back to GPT-4-latest', e);
      const fallback = await import('./noteGeneration.js' + `?t=${Date.now()}`);
      fallback.initNoteGeneration();
    }
  };

  window.__app.switchTranscribeProvider = async function(next) {
    // Best-effort cleanup: drop existing handlers by replacing the control buttons.
    ['startButton','stopButton','pauseResumeButton'].forEach(id => {
      const b = document.getElementById(id);
      if (b) {
        const clone = b.cloneNode(true);
        b.parentNode.replaceChild(clone, b);
      }
    });
    sessionStorage.setItem('transcribe_provider', (next || 'openai').toLowerCase());
    // Re-init recording module for the new provider
    const provider = (sessionStorage.getItem('transcribe_provider') || 'openai').toLowerCase();
    try {
      let mod;
      if (provider === 'soniox') {
        mod = await import('./SONIOX_UPDATE.js' + `?t=${Date.now()}`);
      } else {
        mod = await import('./recording.js' + `?t=${Date.now()}`);
      }
      if (mod && typeof mod.initRecording === 'function') {
        mod.initRecording();
      } else {
        throw new Error('initRecording() missing');
      }
    } catch (e) {
      // Let the caller fall back to reload; preserve state first.
      saveState();
      throw e;
    }
  };

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
