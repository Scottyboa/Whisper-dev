
// speakerVerification.js
// Thin browser wrapper for sherpa-onnx speaker verification (WASM).
// Step 3: module scaffold + safe loaders. Step 4 will wire SONIOX_UPDATE.js to use it.
//
// Place your sherpa-onnx assets under: /assets/sherpa-onnx/
// Example (you will download these from sherpa-onnx releases):
//   - /assets/sherpa-onnx/sherpa-onnx-wasm.js
//   - /assets/sherpa-onnx/sherpa-onnx-wasm.wasm
//   - /assets/sherpa-onnx/model/embedding.onnx         (speaker embedder)
//   - /assets/sherpa-onnx/model/embedding.meta.json    (if required by the build)
//
// Public API (used in Step 4):
//   await initSpeakerVerification();
//   const emb = await extractEmbeddingFromWavBlob(wavBlob);
//   saveProfile(emb, alias); const {embedding, alias} = loadProfile(); clearProfile();
//   const sim = cosineSim(a, b);

const SV_NS = (window.__sv = window.__sv || {});

// ---- Configurable asset locations -----------------------------------------
const DEFAULT_CONFIG = {
  baseUrl: '/assets/sherpa-onnx',
  wasmJs: 'sherpa-onnx-wasm.js',          // glue JS from release
  wasmBin: 'sherpa-onnx-wasm.wasm',       // wasm binary (some builds auto-locate this)
  modelDir: 'model',                       // dir with the embedding model
  modelFile: 'embedding.onnx',             // the actual speaker-embedding model file
  sampleRate: 16000                        // SV models typically expect 16 kHz mono
};

// ---- Lazy loader for sherpa-onnx WASM -------------------------------------
async function loadSherpaOnnxIfNeeded(cfg) {
  if (SV_NS._sherpaReady) return;
  if (SV_NS._loadingSherpa) {
    await SV_NS._loadingSherpa;
    return;
  }
  SV_NS._loadingSherpa = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `${cfg.baseUrl}/${cfg.wasmJs}`;
    script.onload = () => {
      const api = window.SherpaOnnx || window.sherpaOnnx || window.sherpa_onnx || null;
      if (!api) {
        reject(new Error('sherpa-onnx global not found after loading JS'));
        return;
      }
      SV_NS._api = api;
      SV_NS._sherpaReady = true;
      resolve();
    };
    script.onerror = () => reject(new Error('Failed to load sherpa-onnx JS'));
    document.head.appendChild(script);
  });
  await SV_NS._loadingSherpa;
}

// Fast-path: if the page already included a CDN build (your transcribe.html does),
// pick it up without attempting another script load.
function pickExistingSherpaApiIfAny() {
  const api = window.SherpaOnnx || window.sherpaOnnx || window.sherpa_onnx || null;
  if (api) {
    SV_NS._api = api;
    SV_NS._sherpaReady = true;
  }
}


// ---- Initialize a speaker-embedding extractor ------------------------------
async function initSpeakerVerification(userCfg = {}) {
  const cfg = { ...DEFAULT_CONFIG, ...(userCfg || {}) };
  SV_NS._cfg = cfg;
  // Prefer using the already-loaded CDN build if present
  pickExistingSherpaApiIfAny();
  if (!SV_NS._sherpaReady) {
    await loadSherpaOnnxIfNeeded(cfg);
  }

  if (SV_NS._extractor) return; // idempotent

  const api = SV_NS._api;
  if (!api) throw new Error('sherpa-onnx API unavailable');

  // NOTE: Different builds name this API differently. Common pattern:
  //   const extractor = await api.createSpeakerEmbeddingExtractor({
  //     model: `${cfg.baseUrl}/${cfg.modelDir}/${cfg.modelFile}`,
  //     sampleRate: cfg.sampleRate,
  //   });
  //
  // We keep a defensive try/catch so Step 3 won’t crash even before assets are present.
  try {
    if (typeof api.createSpeakerEmbeddingExtractor !== 'function') {
      throw new Error('createSpeakerEmbeddingExtractor() not found in this build');
    }
    SV_NS._extractor = await api.createSpeakerEmbeddingExtractor({
      model: `${cfg.baseUrl}/${cfg.modelDir}/${cfg.modelFile}`,
      sampleRate: cfg.sampleRate,
    });
  } catch (e) {
    console.warn('[SV] Extractor not ready yet:', e.message);
    // Leave extractor undefined; extractEmbeddingFromWavBlob will throw with guidance.
  }
}

// ---- WAV decoding to Float32 mono @ 16 kHz ---------------------------------
async function wavBlobToMono16kFloat32(wavBlob, outSampleRate = 16000) {
  const arrayBuf = await wavBlob.arrayBuffer();
  const ac = new (window.AudioContext || window.webkitAudioContext)();
  const decoded = await ac.decodeAudioData(arrayBuf.slice(0));
  const src = decoded.getChannelData(0);
  const srcRate = decoded.sampleRate;
  // Resample to outSampleRate if needed (linear interpolation for now; enough for embeddings)
  if (srcRate === outSampleRate) {
    ac.close();
    return src.slice(0); // copy
  }
  const length = Math.round(src.length * (outSampleRate / srcRate));
  const dst = new Float32Array(length);
  const ratio = src.length / length;
  for (let i = 0; i < length; i++) {
    const x = i * ratio;
    const x0 = Math.floor(x);
    const x1 = Math.min(src.length - 1, x0 + 1);
    const t = x - x0;
    dst[i] = (1 - t) * src[x0] + t * src[x1];
  }
  ac.close();
  return dst;
}

// ---- Public: extract an embedding from a WAV Blob --------------------------
async function extractEmbeddingFromWavBlob(wavBlob) {
  await initSpeakerVerification(SV_NS._cfg);
  if (!SV_NS._extractor) {
    throw new Error(
      'Speaker extractor not initialized. Ensure sherpa-onnx assets exist under /assets/sherpa-onnx and the model filename matches.'
    );
  }
  const pcm = await wavBlobToMono16kFloat32(wavBlob, (SV_NS._cfg?.sampleRate || 16000));
  // Typical API: extractor.compute(pcmFloat32) → Float32Array embedding
  if (typeof SV_NS._extractor.compute !== 'function') {
    throw new Error('Extractor.compute() not available in this build');
  }
  const emb = await SV_NS._extractor.compute(pcm);
  if (!(emb && emb.length)) {
    throw new Error('Empty embedding returned from extractor');
  }
  return emb; // Float32Array
}

// ---- Profile persistence ----------------------------------------------------
const PROFILE_KEY = 'sv_profile_v1';
const PROFILE_ALIAS_KEY = 'sv_profile_alias_v1';

function saveProfile(embedding, alias = 'You') {
  // Store as base64 to avoid precision loss in JSON
  const bytes = new Uint8Array(embedding.buffer, embedding.byteOffset, embedding.byteLength);
  const b64 = btoa(String.fromCharCode(...bytes));
  sessionStorage.setItem(PROFILE_KEY, b64);
  sessionStorage.setItem(PROFILE_ALIAS_KEY, alias);
}

function loadProfile() {
  const b64 = sessionStorage.getItem(PROFILE_KEY);
  if (!b64) return null;
  const alias = sessionStorage.getItem(PROFILE_ALIAS_KEY) || 'You';
  const bin = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
  // Assume Float32 embedding
  const emb = new Float32Array(bin.buffer, bin.byteOffset, Math.floor(bin.byteLength / 4));
  // Return a copy to avoid aliasing sessionStorage backing buffer
  return { embedding: new Float32Array(emb), alias };
}

function clearProfile() {
  sessionStorage.removeItem(PROFILE_KEY);
  sessionStorage.removeItem(PROFILE_ALIAS_KEY);
}

// ---- Math helpers -----------------------------------------------------------
function cosineSim(a, b) {
  if (!a || !b || a.length !== b.length) return 0;
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na  += a[i] * a[i];
    nb  += b[i] * b[i];
  }
  if (na === 0 || nb === 0) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

// ---- Exports ---------------------------------------------------------------
export {
  initSpeakerVerification,
  extractEmbeddingFromWavBlob,
  saveProfile,
  loadProfile,
  clearProfile,
  cosineSim,
};

// Optional: eager init if the page wants it very early (we’ll lazy-load in main.js instead)
// initSpeakerVerification().catch(() => {/* ignore until assets present */});
