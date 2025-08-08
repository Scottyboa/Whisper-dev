// real-hooks.js — adapter for Scott's existing logic into the new Clean UI

// Assumes your modules are already loaded:
// - recording.js defines startRecording(), stopRecording(), transcribeChunkDirectly()
// - noteGeneration.js defines generateNote()
// - You must ensure those scripts are loaded before this one

window.AppHooks = (function () {
  let onChunkCallback = () => {};

  function init({ setStatus, setPill }) {
    try {
      setStatus("App initialized.");
      setPill("vad", "VAD: ready");
    } catch (e) {
      console.error("init error", e);
      setStatus("Init failed.");
    }
  }

  async function startRecording(opts) {
    try {
      // Pass chunk settings into your globals if needed
      if (typeof setChunkOptions === "function") {
        setChunkOptions({
          chunkMs: opts.chunkMs,
          threshold: opts.threshold,
          silenceTailMs: opts.silenceTailMs
        });
      }

      // Patch transcribeChunkDirectly to notify UI
      if (typeof transcribeChunkDirectly === "function") {
        const origFn = transcribeChunkDirectly;
        window.transcribeChunkDirectly = async function (wavBlob, chunkNum) {
          const text = await origFn(wavBlob, chunkNum);
          if (typeof text === "string" && text.trim()) {
            onChunkCallback(text.trim());
          }
          return text;
        };
      }

      await startRecording();
    } catch (e) {
      console.error("startRecording error:", e);
      throw e;
    }
  }

  async function stopRecording() {
    try {
      await stopRecording();
    } catch (e) {
      console.error("stopRecording error:", e);
      throw e;
    }
  }

  function onTranscriptChunk(cb) {
    onChunkCallback = cb;
  }

  async function generateNote({ apiKey, model, prompt, transcript }) {
    try {
      return await generateNote(apiKey, model, prompt, transcript);
    } catch (e) {
      console.error("generateNote error:", e);
      throw e;
    }
  }

  async function playTTS({ apiKey, voice, instructions, text }) {
    // Optional: If you have a TTS module, plug it in here
    alert("TTS not implemented in your repo yet. Stubbed for now.");
  }

  return {
    init,
    startRecording,
    stopRecording,
    onTranscriptChunk,
    generateNote,
    playTTS
  };
})();
