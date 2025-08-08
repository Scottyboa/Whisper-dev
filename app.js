/* UI wiring with a pluggable hook layer.
 * Replace demo-hooks.js with your real modules, but keep this API:
 * window.AppHooks = {
 *   init({ setStatus, setPill }): void
 *   startRecording({chunkMs, threshold, silenceTailMs}): Promise<void>
 *   stopRecording(): Promise<void>
 *   onTranscriptChunk(cb: (text) => void): void
 *   generateNote({ apiKey, model, prompt }): Promise<string>
 *   playTTS({ apiKey, voice, instructions, text }): Promise<void>
 * }
 */
(function(){
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  // Elements
  const apiKeyEl = $('#apiKey');
  const rememberKeyEl = $('#rememberKey');
  const saveKeyBtn = $('#saveKeyBtn');

  const modelNameEl = $('#modelName');
  const promptSlotEl = $('#promptSlot');
  const promptTextEl = $('#promptText');
  const savePromptBtn = $('#savePromptBtn');
  const loadPromptBtn = $('#loadPromptBtn');
  const clearPromptBtn = $('#clearPromptBtn');

  const voiceSelectEl = $('#voiceSelect');
  const voiceInstructionsEl = $('#voiceInstructions');
  const playTTSBtn = $('#playTTSBtn');

  const startBtn = $('#startBtn');
  const stopBtn = $('#stopBtn');
  const markBtn = $('#markBtn');
  const generateNoteBtn = $('#generateNoteBtn');
  const statusBar = $('#statusBar');

  const transcriptionEl = $('#transcription');
  const noteOutputEl = $('#noteOutput');

  const copyTranscriptBtn = $('#copyTranscriptBtn');
  const clearTranscriptBtn = $('#clearTranscriptBtn');
  const copyNoteBtn = $('#copyNoteBtn');
  const clearNoteBtn = $('#clearNoteBtn');

  const chunkMsEl = $('#chunkMs');
  const sileroThresholdEl = $('#sileroThreshold');
  const silenceTailEl = $('#silenceTailMs');

  const downloadTranscriptBtn = $('#downloadTranscriptBtn');
  const downloadNoteBtn = $('#downloadNoteBtn');

  const vadPill = $('#vadStatus');
  const connPill = $('#connStatus');
  const recPill = $('#recStatus');
  const themeToggle = $('#themeToggle');

  // State
  const S = {
    apiKey: '',
    model: '',
    prompts: {}, // slot -> text
    transcript: '',
  };

  const setStatus = (msg) => { statusBar.textContent = msg; };
  const setPill = (which, text) => {
    const map = { vad: vadPill, api: connPill, rec: recPill };
    const el = map[which]; if (!el) return;
    el.textContent = text;
  };

  // Load from sessionStorage
  function bootload(){
    try {
      const key = sessionStorage.getItem('tn_api_key');
      if (key) {
        apiKeyEl.value = key;
        rememberKeyEl.checked = true;
        S.apiKey = key;
      }
      const mdl = sessionStorage.getItem('tn_model');
      if (mdl) modelNameEl.value = mdl;

      const prompts = JSON.parse(sessionStorage.getItem('tn_prompts') || '{}');
      S.prompts = prompts;
      setStatus('Ready. Loaded session config.');
    } catch(e) {
      console.warn('bootload error', e);
    }
  }

  function savePrompts(){
    sessionStorage.setItem('tn_prompts', JSON.stringify(S.prompts));
  }

  // API key
  saveKeyBtn.addEventListener('click', () => {
    const v = apiKeyEl.value.trim();
    S.apiKey = v;
    if (rememberKeyEl.checked) {
      sessionStorage.setItem('tn_api_key', v);
    } else {
      sessionStorage.removeItem('tn_api_key');
    }
    setStatus(v ? 'API key saved to session.' : 'API key cleared.');
    setPill('api', v ? 'API: set' : 'API: idle');
  });

  // Model
  modelNameEl.addEventListener('change', () => {
    const m = modelNameEl.value.trim();
    sessionStorage.setItem('tn_model', m);
    setStatus(`Model set to ${m || '(none)'}.`);
  });

  // Prompt slots
  savePromptBtn.addEventListener('click', () => {
    const slot = promptSlotEl.value;
    S.prompts[slot] = promptTextEl.value;
    savePrompts();
    setStatus(`Saved prompt slot ${slot}.`);
  });
  loadPromptBtn.addEventListener('click', () => {
    const slot = promptSlotEl.value;
    promptTextEl.value = S.prompts[slot] || '';
    setStatus(`Loaded prompt slot ${slot}.`);
  });
  clearPromptBtn.addEventListener('click', () => {
    const slot = promptSlotEl.value;
    delete S.prompts[slot];
    savePrompts();
    if (promptSlotEl.value === slot) promptTextEl.value = '';
    setStatus(`Cleared prompt slot ${slot}.`);
  });

  // Recording
  startBtn.addEventListener('click', async () => {
    try {
      startBtn.disabled = true;
      stopBtn.disabled = false;
      setPill('rec', 'Mic: on');
      setStatus('Starting recording…');

      await window.AppHooks.startRecording({
        chunkMs: parseInt(chunkMsEl.value,10),
        threshold: parseFloat(sileroThresholdEl.value),
        silenceTailMs: parseInt(silenceTailEl.value,10),
      });
      setStatus('Recording. VAD active.');
    } catch (e){
      console.error(e);
      setStatus('Failed to start recording.');
      startBtn.disabled = false;
      stopBtn.disabled = true;
      setPill('rec', 'Mic: off');
    }
  });

  stopBtn.addEventListener('click', async () => {
    try {
      stopBtn.disabled = true;
      await window.AppHooks.stopRecording();
      setPill('rec', 'Mic: off');
      setStatus('Stopped recording.');
    } catch(e){
      console.error(e);
      setStatus('Failed to stop recording.');
    } finally {
      startBtn.disabled = false;
    }
  });

  markBtn.addEventListener('click', () => {
    const marker = `
--- MARKER ${new Date().toLocaleTimeString()} ---
`;
    transcriptionEl.textContent += marker;
  });

  // Transcript append from hooks
  window.AppHooks.onTranscriptChunk((text) => {
    transcriptionEl.textContent += text + "\n";
  });

  // Note generation
  generateNoteBtn.addEventListener('click', async () => {
    const apiKey = S.apiKey || apiKeyEl.value.trim();
    const model = modelNameEl.value.trim();
    const prompt = promptTextEl.value.trim();
    const transcript = transcriptionEl.textContent.trim();

    if (!apiKey) { setStatus('Missing API key.'); return; }
    if (!model) { setStatus('Missing model.'); return; }
    if (!prompt) { setStatus('Missing prompt.'); return; }
    if (!transcript) { setStatus('No transcript text.'); return; }

    setPill('api', 'API: working…');
    setStatus('Generating note…');
    try {
      const note = await window.AppHooks.generateNote({ apiKey, model, prompt, transcript });
      noteOutputEl.textContent = note;
      setStatus('Note generated.');
    } catch(e){
      console.error(e);
      setStatus('Note generation failed.');
    } finally {
      setPill('api', 'API: idle');
    }
  });

  // TTS
  playTTSBtn.addEventListener('click', async () => {
    const apiKey = S.apiKey || apiKeyEl.value.trim();
    const voice = voiceSelectEl.value;
    const instructions = voiceInstructionsEl.value;
    const text = (window.getSelection()?.toString() || noteOutputEl.textContent || '').trim();
    if (!apiKey) { setStatus('Missing API key for TTS.'); return; }
    if (!text) { setStatus('Nothing selected to speak.'); return; }
    setStatus('Playing TTS…');
    try {
      await window.AppHooks.playTTS({ apiKey, voice, instructions, text });
      setStatus('TTS playback completed.');
    } catch(e){
      console.error(e);
      setStatus('TTS failed.');
    }
  });

  // Utilities
  copyTranscriptBtn.addEventListener('click', async () => {
    await navigator.clipboard.writeText(transcriptionEl.textContent);
    setStatus('Transcript copied.');
  });
  clearTranscriptBtn.addEventListener('click', () => {
    transcriptionEl.textContent = '';
    setStatus('Transcript cleared.');
  });
  copyNoteBtn.addEventListener('click', async () => {
    await navigator.clipboard.writeText(noteOutputEl.textContent);
    setStatus('Note copied.');
  });
  clearNoteBtn.addEventListener('click', () => {
    noteOutputEl.textContent = '';
    setStatus('Note cleared.');
  });

  function download(name, text){
    const blob = new Blob([text], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }
  downloadTranscriptBtn.addEventListener('click', () => {
    download('transcript.txt', transcriptionEl.textContent || '');
  });
  downloadNoteBtn.addEventListener('click', () => {
    download('note.txt', noteOutputEl.textContent || '');
  });

  // Theme toggle
  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
  });

  // Init
  bootload();
  if (window.AppHooks?.init) {
    window.AppHooks.init({ setStatus, setPill });
  }
})();
