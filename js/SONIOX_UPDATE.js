
// recording.js
// Updated recording module without encryption/HMAC mechanisms,
// processing audio chunks using OfflineAudioContext,
// and implementing a client‑side transcription queue that sends each processed chunk directly to OpenAI's Whisper API.
let transcriptionError = false;

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32-bit signed integer
  }
  // Convert to an unsigned 32-bit integer and return as string.
  return (hash >>> 0).toString();
}

const DEBUG = true;
 // — Silero VAD initialization —
 // Holds the loaded VAD instance
 let sileroVAD = null;
 // Buffer for accumulating VAD-detected speech segments
  let pendingVADChunks = [];
  let pendingVADLock = false;  // mutex for pause/stop flushes
 // Minimum total speech duration before sending (in seconds)
 const MIN_CHUNK_DURATION_SECONDS = 90;
 // Configure callbacks for speech start/end
 const sileroVADOptions = {
  // Force a final speech-end event when pause/stop is called, even mid-speech
  submitUserSpeechOnPause: true,
  // ─── MODEL THRESHOLDS & SILENCE PARAMETERS ───────────────
  // confidence ≥ 0.5 → speech
  positiveSpeechThreshold: 0.4,
  // confidence ≤ 0.35 → silence
  negativeSpeechThreshold: 0.35,
  // allow up to 3 “false-silence” frames before firing onSpeechEnd
  redemptionFrames: 5,
  // prepend 1 frame of audio before onSpeechStart
  preSpeechPadFrames: 2,
  // require at least 3 consecutive speech frames to declare onSpeechStart
  minSpeechFrames: 3,
   onSpeechStart: () => {
     // Prevent VAD callbacks after stop
     if (manualStop) return;
     logInfo("Silero VAD: speech started");
     recordingActive = true;
     chunkStartTime = Date.now();
     // Start timer on first speech
    // Always show “Recording…” when speech starts, even on Resume
    updateStatusMessage("Recording…", "green");
    // And still only start the timer once
    if (!recordingTimerInterval) {
      recordingStartTime     = Date.now();
      recordingTimerInterval = setInterval(updateRecordingTimer, 1000);
    }
   },
   onSpeechEnd: (audioFloat32) => {
     // Prevent VAD callbacks after stop
     if (manualStop) return;
     logInfo("Silero VAD: speech ended — buffering audio");
     // Accumulate this segment
     pendingVADChunks.push(audioFloat32);
     // Check if we've buffered enough total duration
     const totalSamples = pendingVADChunks.reduce((sum, seg) => sum + seg.length, 0);
     if (totalSamples >= MIN_CHUNK_DURATION_SECONDS * 16000) {
       // Concatenate into one Float32Array
       const combined = new Float32Array(totalSamples);
       let offset = 0;
       for (const seg of pendingVADChunks) {
         combined.set(seg, offset);
         offset += seg.length;
       }
       // Encode and send for transcription
       const wavBlob = encodeWAV(floatTo16BitPCM(combined), 16000, 1);
       enqueueTranscription(wavBlob, chunkNumber++);
       // Reset buffer
       pendingVADChunks = [];
     }
   }
 };

function logDebug(message, ...optionalParams) {
  if (DEBUG) {
    console.debug(new Date().toISOString(), "[DEBUG]", message, ...optionalParams);
  }
}
function logInfo(message, ...optionalParams) {
  console.info(new Date().toISOString(), "[INFO]", message, ...optionalParams);
}
function logError(message, ...optionalParams) {
  console.error(new Date().toISOString(), "[ERROR]", message, ...optionalParams);
}

const MIN_CHUNK_DURATION = 120000; // 120 seconds
 let recordingActive    = false;   // only true after first speech detected
 let mediaStream = null;
let processedAnyAudioFrames = false;
let audioReader = null;
let recordingStartTime = 0;
// Accumulate time from all active segments
let accumulatedRecordingTime = 0;
let recordingTimerInterval;
let completionTimerInterval = null;
let completionStartTime = 0;
let groupId = null;
let chunkNumber = 1;
let manualStop = false;
let transcriptChunks = {};  // {chunkNumber: transcript}
let pollingIntervals = {};  // (removed polling functions, kept for legacy structure)

let chunkStartTime = 0;
let lastFrameTime = 0;
let lastSpeechTime = 0;       // used by readLoop/scheduleChunk
const VAD_THRESHOLD = 0.005;  // RMS gate for speech detection
const SILENCE_DURATION = 2000; // ms of silence to close a chunk
let chunkTimeoutId;
let expectedChunks = 0;

let chunkProcessingLock = false;
let pendingStop = false;
let finalChunkProcessed = false;
let recordingPaused = false;
let audioFrames = []; // Buffer for audio frames

// --- New Transcription Queue Variables ---
let transcriptionQueue = [];  // Queue of { chunkNumber, blob }
let isProcessingQueue = false;
let enqueuedChunks = 0;  

// --- Utility Functions ---
function updateStatusMessage(message, color = "#333") {
  const statusElem = document.getElementById("statusMessage");
  if (statusElem) {
    statusElem.innerText = message;
    statusElem.style.color = color;
  }
}

function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  if (totalSec < 60) {
    return totalSec + " sec";
  } else {
    const minutes = Math.floor(totalSec / 60);
    const seconds = totalSec % 60;
    return minutes + " min" + (seconds > 0 ? " " + seconds + " sec" : "");
  }
}

function updateRecordingTimer() {
  // Timer shows accumulated time plus current active segment time
  const elapsed = accumulatedRecordingTime + (Date.now() - recordingStartTime);
  const timerElem = document.getElementById("recordTimer");
  if (timerElem) {
    timerElem.innerText = "Recording Timer: " + formatTime(elapsed);
  }
}

function stopMicrophone() {
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
    mediaStream = null;
    logInfo("Microphone stopped.");
  }
  if (audioReader) {
    audioReader.cancel();
    audioReader = null;
  }
}
  
// --- Base64 Helper Functions (kept for legacy) ---
function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
function base64ToArrayBuffer(base64) {
  const binary = window.atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// --- Device Token Management ---
function getDeviceToken() {
  let token = localStorage.getItem("device_token");
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem("device_token", token);
  }
  return token;
}

// --- API Key Retrieval ---
// With encryption removed, we now simply get the API key from sessionStorage.
function getAPIKey() {
  return sessionStorage.getItem("user_api_key");
}

const SONIOX_BASE = "https://api.soniox.com/v1";

async function uploadToSonioxFile(wavBlob, filename, retries = 5, backoff = 2000) {
  const apiKey = getAPIKey();
  if (!apiKey) throw new Error("API key not available");
  const fd = new FormData();
  fd.append("file", wavBlob, filename);
  try {
    const rsp = await fetch(`${SONIOX_BASE}/files`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
     body: fd,
    });
    if (!rsp.ok) throw new Error(`Soniox file upload failed: ${await rsp.text()}`);
    const j = await rsp.json();
    return j.id; // file_id
  } catch (err) {
    if (retries > 0) {
      console.warn(`Upload failed, retrying in ${backoff}ms… (${retries} left)`);
      await new Promise(r => setTimeout(r, backoff));
      return uploadToSonioxFile(wavBlob, filename, retries - 1, Math.floor(backoff * 1.5));
    }
    throw err;
  }
}

async function createSonioxTranscription(fileId, context, retries = 5, backoff = 2000) {
  const apiKey = getAPIKey();
  if (!apiKey) throw new Error("API key not available");
  const body = {
    model: "stt-async-v3",
    file_id: fileId,
    // Norwegian first, then English, but Soniox auto-detects if omitted:
    language_hints: ["no", "en"],
    // Speaker diarization disabled to keep plain text similar to your current UI:
    enable_speaker_diarization: false,
    enable_language_identification: true,
    context, // optional domain/context string
  };
  try {
    const rsp = await fetch(`${SONIOX_BASE}/transcriptions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!rsp.ok) throw new Error(`Create transcription failed: ${await rsp.text()}`);
    const j = await rsp.json();
    return j.id; // transcription_id
  } catch (err) {
    if (retries > 0) {
      console.warn(`Create failed, retrying in ${backoff}ms… (${retries} left)`);
      await new Promise(r => setTimeout(r, backoff));
      return createSonioxTranscription(fileId, context, retries - 1, Math.floor(backoff * 1.5));
    }
    throw err;
  }
}

async function pollSonioxTranscription(transcriptionId, timeoutMs = 300000, intervalMs = 1500) {
  const apiKey = getAPIKey();
  const start = Date.now();
  while (true) {
    const rsp = await fetch(`${SONIOX_BASE}/transcriptions/${transcriptionId}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (!rsp.ok) throw new Error(`Poll failed: ${await rsp.text()}`);
    const j = await rsp.json();
    if (j.status === "completed") return;
    if (j.status === "error") throw new Error(j.error_message || "Transcription error");
    if (Date.now() - start > timeoutMs) throw new Error("Transcription timed out");
    await new Promise(r => setTimeout(r, intervalMs));
  }
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function fetchSonioxTranscriptText(transcriptionId, retries = 5, delayMs = 2000) {
  const apiKey = getAPIKey();
  let attempt = 0;

  while (true) {
    try {
      const rsp = await fetch(`${SONIOX_BASE}/transcriptions/${transcriptionId}/transcript`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });

      if (!rsp.ok) {
        const body = await rsp.text().catch(() => "");
       throw new Error(
         `Get transcript failed: ${rsp.status} ${rsp.statusText}` +
         (body ? ` — ${body}` : "")
        );
      }

      const j = await rsp.json();
      return j.text || "";
    } catch (err) {
      attempt += 1;
      if (attempt > retries) {
        logError(`Get transcript failed after ${retries} retries:`, err);
        throw err;
      }
      logInfo(`Get transcript attempt ${attempt} failed; retrying in ${delayMs}ms…`);
      await sleep(delayMs);
    }
  }
}

// + Estimate WAV duration (mono, 16-bit, 16 kHz)
function estimateWavSeconds(wavBlob) {
  const BYTES_PER_SEC = 16000 /* Hz */ * 2 /* bytes/sample */ * 1 /* channel */; // 32000
  const payloadBytes = Math.max(0, wavBlob.size - 44); // strip 44-byte WAV header
  return payloadBytes / BYTES_PER_SEC;
}


// ─────────────────── Deletion helpers (place right after fetchSonioxTranscriptText) ───────────────────
async function deleteSonioxTranscription(transcriptionId) {
  if (!transcriptionId) return;
  const apiKey = getAPIKey();
  try {
    const rsp = await fetch(`${SONIOX_BASE}/transcriptions/${transcriptionId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (!rsp.ok) {
      const msg = await rsp.text();
      logDebug(`Delete transcription ${transcriptionId} non-OK: ${msg}`);
    } else {
      logInfo(`Deleted transcription ${transcriptionId}`);
    }
  } catch (e) {
    logDebug(`Delete transcription ${transcriptionId} failed:`, e);
  }
}

async function deleteSonioxFile(fileId) {
  if (!fileId) return;
  const apiKey = getAPIKey();
  try {
    const rsp = await fetch(`${SONIOX_BASE}/files/${fileId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (!rsp.ok) {
      const msg = await rsp.text();
      logDebug(`Delete file ${fileId} non-OK: ${msg}`);
    } else {
      logInfo(`Deleted file ${fileId}`);
    }
  } catch (e) {
    logDebug(`Delete file ${fileId} failed:`, e);
  }
}

async function cleanupSonioxResources({ transcriptionId, fileId }) {
  // Best-effort cleanup; do not throw.
  await Promise.allSettled([
    deleteSonioxTranscription(transcriptionId),
    deleteSonioxFile(fileId),
  ]);
}

// --- OfflineAudioContext Processing ---
// This function takes interleaved PCM samples (Float32Array), the original sample rate, and the number of channels,
// converts the audio to mono (averaging channels if needed), resamples to 16kHz, and applies 0.3s fade‑in/out.
// It returns a 16-bit PCM WAV Blob.
async function processAudioUsingOfflineContext(pcmFloat32, originalSampleRate, numChannels) {
  const targetSampleRate = 16000;
  
  // Calculate the number of frames
  const numFrames = pcmFloat32.length / numChannels;
  
  // Create an AudioBuffer in a temporary AudioContext
  let tempCtx = new AudioContext();
  let originalBuffer = tempCtx.createBuffer(numChannels, numFrames, originalSampleRate);
  
  if (numChannels === 1) {
    originalBuffer.copyToChannel(pcmFloat32, 0);
  } else {
    // Deinterleave and copy each channel
    for (let ch = 0; ch < numChannels; ch++) {
      let channelData = new Float32Array(numFrames);
      for (let i = 0; i < numFrames; i++) {
        channelData[i] = pcmFloat32[i * numChannels + ch];
      }
      originalBuffer.copyToChannel(channelData, ch);
    }
  }
  // Convert to mono by averaging channels if necessary
  let monoBuffer;
  if (numChannels > 1) {
    let monoData = new Float32Array(numFrames);
    for (let i = 0; i < numFrames; i++) {
      let sum = 0;
      for (let ch = 0; ch < numChannels; ch++) {
        sum += originalBuffer.getChannelData(ch)[i];
      }
      monoData[i] = sum / numChannels;
    }
    monoBuffer = tempCtx.createBuffer(1, numFrames, originalSampleRate);
    monoBuffer.copyToChannel(monoData, 0);
  } else {
    monoBuffer = originalBuffer;
  }
  tempCtx.close();
  
  // Set up OfflineAudioContext for resampling
  const duration = monoBuffer.duration;
  const offlineCtx = new OfflineAudioContext(1, targetSampleRate * duration, targetSampleRate);
  
  const source = offlineCtx.createBufferSource();
  source.buffer = monoBuffer;
  
// Modified code snippet to fix the negative time error:
const gainNode = offlineCtx.createGain();
const fadeDuration = 0.3;
gainNode.gain.setValueAtTime(0, 0);
gainNode.gain.linearRampToValueAtTime(1, fadeDuration);

// Compute fade-out start time, ensuring it's non-negative
const fadeOutStart = Math.max(0, duration - fadeDuration);
if (duration < fadeDuration * 2) {
  console.warn(`[Audio] Short chunk (${duration.toFixed(2)}s) — fade-in/out may be squished`);
}

gainNode.gain.setValueAtTime(1, fadeOutStart);
gainNode.gain.linearRampToValueAtTime(0, duration);
  
  source.connect(gainNode).connect(offlineCtx.destination);
  source.start(0);
  
  const renderedBuffer = await offlineCtx.startRendering();
  const processedData = renderedBuffer.getChannelData(0);
  const processedInt16 = floatTo16BitPCM(processedData);
  const wavBlob = encodeWAV(processedInt16, targetSampleRate, 1);
  await offlineCtx.close();
  return wavBlob;
}

 // --- New: Transcribe Chunk Directly ---

// Sends the WAV blob to Soniox and returns the transcript text; cleans up after.
 async function transcribeChunkDirectly(wavBlob, chunkNum) {
   // Build a domain/context string like your old prompt, but Soniox expects 'context'
  const context =
    "Doctor-patient consultation. Mostly Norwegian; sometimes English. " +
    "Transcribe clearly. Exclude filler words and false starts. Do not paraphrase or summarize.";
  let fileId = null;
  let txId = null;
  try {
    const filename = `chunk_${chunkNum}.wav`;
    // 1) upload the WAV
    fileId = await uploadToSonioxFile(wavBlob, filename);
    // 2) create a transcription job on Soniox async model
    txId = await createSonioxTranscription(fileId, context);
    // 3) poll until done, timeout scales with audio length
    const secs = estimateWavSeconds(wavBlob);
    const timeoutMs = Math.max(300000, Math.ceil(secs * 4000)); // >=5 min, ~4× audio length
    await pollSonioxTranscription(txId, timeoutMs, 1500);
    // 4) fetch final text
    const text = await fetchSonioxTranscriptText(txId);
    // 5) best-effort cleanup
    await cleanupSonioxResources({ transcriptionId: txId, fileId });
    return text || "";
  } catch (error) {
     logError(`Error transcribing chunk ${chunkNum}:`, error);
    // try to clean up anything we created
    await cleanupSonioxResources({ transcriptionId: txId, fileId });
     updateStatusMessage(
       "Transcription error with Soniox API. Check key/credits or try again.",
       "red"
     );
     transcriptionError = true;
     return `[Error transcribing chunk ${chunkNum}]`;
   }
 }


// --- Transcription Queue Processing ---
// Adds a processed chunk to the queue and processes chunks sequentially.
function enqueueTranscription(wavBlob, chunkNum) {
  transcriptionQueue.push({ chunkNum, wavBlob });
  enqueuedChunks += 1;

  // Prevent simultaneous queue runs.
  // If a queue is already processing, wait until it's done before re-starting.
  if (!isProcessingQueue) {
    processTranscriptionQueue();
  }
}


async function processTranscriptionQueue() {
  // If queue already in progress, wait for it to finish before continuing.
  if (isProcessingQueue) {
    while (isProcessingQueue) {
      await new Promise(r => setTimeout(r, 100));
    }
  }

  isProcessingQueue = true;

  while (transcriptionQueue.length > 0) {
    let { chunkNum, wavBlob } = transcriptionQueue.shift();
    logInfo(`Transcribing chunk ${chunkNum}...`);

    const transcript = await transcribeChunkDirectly(wavBlob, chunkNum);
    transcriptChunks[chunkNum] = transcript;
    updateTranscriptionOutput();
    // free this chunk’s audio immediately
    wavBlob = null;
  }
  
  isProcessingQueue = false;
}

// --- Removed: Polling functions (pollChunkTranscript) since we now transcribe directly ---

// --- Audio Chunk Processing ---
async function processAudioChunkInternal(force = false) {
  if (audioFrames.length === 0) {
    logDebug("No audio frames to process.");
    return;
  }
  // Mark that we have processed at least one frame set.
  processedAnyAudioFrames = true;
  
  logInfo(`Processing ${audioFrames.length} audio frames for chunk ${chunkNumber}.`);
  const framesToProcess = audioFrames;
  audioFrames = []; // Clear the buffer
  const sampleRate = framesToProcess[0].sampleRate;
  const numChannels = framesToProcess[0].numberOfChannels;
  let pcmDataArray = [];
  for (const frame of framesToProcess) {
    const numFrames = frame.numberOfFrames;
    if (numChannels === 1) {
      const channelData = new Float32Array(numFrames);
      frame.copyTo(channelData, { planeIndex: 0 });
      pcmDataArray.push(channelData);
    } else {
      let channelData = [];
      for (let c = 0; c < numChannels; c++) {
        const channelArray = new Float32Array(numFrames);
        frame.copyTo(channelArray, { planeIndex: c });
        channelData.push(channelArray);
      }
      const interleaved = new Float32Array(numFrames * numChannels);
      for (let i = 0; i < numFrames; i++) {
        for (let c = 0; c < numChannels; c++) {
          interleaved[i * numChannels + c] = channelData[c][i];
        }
      }
      pcmDataArray.push(interleaved);
    }
    frame.close();
  }
  const totalLength = pcmDataArray.reduce((sum, arr) => sum + arr.length, 0);
  const pcmFloat32 = new Float32Array(totalLength);
  let offset = 0;
  for (const arr of pcmDataArray) {
    pcmFloat32.set(arr, offset);
    offset += arr.length;
  }
  
  // Process the raw audio samples using OfflineAudioContext:
  // Convert to mono, resample to 16kHz, and apply 0.3s fade-in/out.
  // No extra silence padding—just resample & fade the raw PCM
  const wavBlob = await processAudioUsingOfflineContext(
    pcmFloat32,
    sampleRate,
    numChannels
  );
  
  // Instead of uploading to a backend, enqueue this processed chunk for direct transcription.
  enqueueTranscription(wavBlob, chunkNumber);
  
  chunkNumber++;
}

async function safeProcessAudioChunk(force = false) {
  if (manualStop && finalChunkProcessed) {
    logDebug("Final chunk already processed; skipping safeProcessAudioChunk.");
    return;
  }
  if (chunkProcessingLock) {
    logDebug("Chunk processing is locked; skipping safeProcessAudioChunk.");
    return;
  }
  chunkProcessingLock = true;
  await processAudioChunkInternal(force);
  chunkProcessingLock = false;
  if (pendingStop) {
    pendingStop = false;
    finalizeStop();
  }
}

function finalizeStop() {
  const startButton = document.getElementById("startButton");
  const stopButton = document.getElementById("stopButton");
  const pauseResumeButton = document.getElementById("pauseResumeButton");
  if (startButton) startButton.disabled = false;
  if (stopButton) stopButton.disabled = true;
  if (pauseResumeButton) pauseResumeButton.disabled = true;
  logInfo("Recording stopped by user. Finalizing transcription.");
  // Optionally, you could wait here for the queue to empty before declaring completion.
}

function updateTranscriptionOutput() {
  const sortedKeys = Object.keys(transcriptChunks).map(Number).sort((a, b) => a - b);
  let combinedTranscript = "";
  sortedKeys.forEach(key => {
    combinedTranscript += transcriptChunks[key] + " ";
  });
  const transcriptionElem = document.getElementById("transcription");
  if (transcriptionElem) {
    transcriptionElem.value = combinedTranscript.trim();
  }
  if (manualStop && Object.keys(transcriptChunks).length >= expectedChunks) {
    clearInterval(completionTimerInterval);
    if (!transcriptionError) {
      updateStatusMessage("Transcription finished!", "green");
      logInfo("Transcription complete.");
    } else {
      logInfo("Transcription complete with errors; keeping error message visible.");
    }
    transcriptChunks = {};
  }
}

function floatTo16BitPCM(input) {
  const output = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    let s = Math.max(-1, Math.min(1, input[i]));
    output[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }
  return output;
}

function encodeWAV(samples, sampleRate, numChannels) {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  function writeString(offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * 2, true);
  view.setUint16(32, numChannels * 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, samples.length * 2, true);
  let offset = 44;
  for (let i = 0; i < samples.length; i++, offset += 2) {
    view.setInt16(offset, samples[i], true);
  }
  return new Blob([view], { type: 'audio/wav' });
}

function scheduleChunk() {
  // bail out immediately if we’ve stopped or paused
  if (!recordingActive || manualStop || recordingPaused) return;

  const elapsed     = Date.now() - chunkStartTime;
  const silenceFor  = Date.now() - lastSpeechTime;

  if (elapsed >= MIN_CHUNK_DURATION && silenceFor >= SILENCE_DURATION) {
    logInfo("Silence detected after min-duration; closing chunk.");
    safeProcessAudioChunk();
    recordingActive  = false;
    chunkStartTime   = Date.now();
    lastSpeechTime   = Date.now();
    logInfo("Listening for speech…");

    // after closing a chunk we do NOT immediately re‑arm the timer;
    // we’ll wait for next `onSpeechStart` to call scheduleChunk again
  } else {
    // only re‑schedule while still in the middle of a potential chunk
    chunkTimeoutId = setTimeout(scheduleChunk, 500);
  }
}

function resetRecordingState() {
  // ─── Clear our quota-error flag for this session ───
  transcriptionError = false;
  // ─── Clear any old completion timer (we’re starting fresh) ───
  if (completionTimerInterval) {
    clearInterval(completionTimerInterval);
    completionTimerInterval = null;
  }
  const compTimerElem = document.getElementById("transcribeTimer");
  if (compTimerElem) compTimerElem.innerText = "Completion Timer: 0 sec";
  enqueuedChunks = 0;
  expectedChunks = 0;
  Object.values(pollingIntervals).forEach(interval => clearInterval(interval));
  pollingIntervals = {};
  clearTimeout(chunkTimeoutId);
  if (recordingTimerInterval) {
    clearInterval(recordingTimerInterval);
    recordingTimerInterval = null;
  }

  transcriptChunks = {};
  audioFrames = [];
  chunkStartTime = Date.now();
  lastFrameTime = Date.now();
  lastSpeechTime = Date.now();
  manualStop = false;
  finalChunkProcessed = false;
  recordingPaused = false;
  groupId = Date.now().toString();
  chunkNumber = 1;
  // Reset accumulated recording time for a new session
   accumulatedRecordingTime = 0;
   processedAnyAudioFrames = false;
  // reset VAD & UI timer
  recordingActive    = false;
  // lastSpeechTime removed (legacy)
  const recTimerElem = document.getElementById("recordTimer");
  if (recTimerElem) recTimerElem.innerText = "Recording Timer: 0 sec";
}

function initRecording() {
  const startButton       = document.getElementById("startButton");
  const stopButton        = document.getElementById("stopButton");
  const pauseResumeButton = document.getElementById("pauseResumeButton");
  if (!startButton || !stopButton || !pauseResumeButton) return;

  // --- PULL readLoop INTO SHARED SCOPE ---
  async function readLoop() {
    try {
      const { done, value } = await audioReader.read();
      if (done) {
        logInfo("Audio track reading complete.");
        return;
      }
      // VAD computation
      const numSamples = value.numberOfFrames * value.numberOfChannels;
      const buf = new Float32Array(numSamples);
      value.copyTo(buf, { planeIndex: 0 });
      let sumSq = 0;
      for (let i = 0; i < buf.length; i++) sumSq += buf[i] * buf[i];
      const rms = Math.sqrt(sumSq / buf.length);
      logDebug(`RMS=${rms.toFixed(5)}`);

      if (rms > VAD_THRESHOLD) {
        lastSpeechTime = Date.now();
        if (!recordingActive) {
          // — NEW: log whenever speech is detected
          logInfo("Speech detected… recording");
          recordingActive = true;
          chunkStartTime  = Date.now();

          // Only start the on-screen timer on the very first chunk
          if (chunkNumber === 1) {
            recordingStartTime = Date.now();
            if (recordingTimerInterval) clearInterval(recordingTimerInterval);
            recordingTimerInterval = setInterval(updateRecordingTimer, 1000);
            pauseResumeButton.innerText = "Pause Recording";
            updateStatusMessage("Recording…", "green");
          }

          scheduleChunk();
        }
      }

      if (recordingActive) {
        audioFrames.push(value);
      }
      readLoop();
    } catch (err) {
      logError("Error reading audio frames", err);
    }
  }

  startButton.addEventListener("click", async () => {
    // Retrieve the API key before starting.
    const apiKey = getAPIKey();
  if (!apiKey) {
    alert("Please enter your Soniox API key first.");
    return;
  }
    resetRecordingState();
    const transcriptionElem = document.getElementById("transcription");
    if (transcriptionElem) transcriptionElem.value = "";
    
    // initialize and start Silero VAD
    updateStatusMessage("Loading voice-activity model...", "orange");
    try {
      if (!sileroVAD) {
        sileroVAD = await vad.MicVAD.new(sileroVADOptions);
      }
      await sileroVAD.start();
      updateStatusMessage("Listening for speech…", "green");
      logInfo("Silero VAD started");
      startButton.disabled = true;
      stopButton.disabled = false;
      pauseResumeButton.disabled = false;
      pauseResumeButton.innerText = "Pause Recording";
    } catch (error) {
      updateStatusMessage("VAD initialization error: " + error, "red");
      logError("Silero VAD error", error);
    }
  });

pauseResumeButton.addEventListener("click", async () => {
  if (recordingPaused) {
    // RESUME: destroy old VAD and start a fresh one
    updateStatusMessage("Resuming recording…", "orange");
    try {
      // ── destroy previous VAD instance to free WASM and buffers ──
      if (sileroVAD && typeof sileroVAD.destroy === "function") {
        await sileroVAD.destroy();
      }
      // re-create the VAD (this will re-prompt/open the mic)
      sileroVAD = await vad.MicVAD.new(sileroVADOptions);
      await sileroVAD.start();
      recordingPaused = false;
      // Restart timer
      recordingStartTime = Date.now();
      if (recordingTimerInterval) clearInterval(recordingTimerInterval);
      recordingTimerInterval = setInterval(updateRecordingTimer, 1000);
      pauseResumeButton.innerText = "Pause Recording";
      updateStatusMessage("Listening for speech…", "green");
      logInfo("Silero VAD resumed");
    } catch (err) {
      updateStatusMessage("Error resuming VAD: " + err, "red");
      logError("Error resuming Silero VAD:", err);
    }
  } else {
   // — FLUSH any pending VAD segments before pausing — 
   // — FLUSH any pending VAD segments before pausing —
if (pendingVADChunks.length > 0 && !pendingVADLock) {
  pendingVADLock = true;
  try {
    const totalSamples = pendingVADChunks.reduce((sum, seg) => sum + seg.length, 0);
    const combined     = new Float32Array(totalSamples);
    let offset         = 0;
    for (const seg of pendingVADChunks) {
      combined.set(seg, offset);
      offset += seg.length;
    }
    const wavBlob = encodeWAV(floatTo16BitPCM(combined), 16000, 1);
    enqueueTranscription(wavBlob, chunkNumber++);
    pendingVADChunks = [];
  } finally {
    pendingVADLock = false;
  }
}

    // PAUSE: stop VAD and flush any buffered speech
    updateStatusMessage("Pausing recording…", "orange");
    try {
      await sileroVAD.pause();
      logInfo("Silero VAD paused");
    } catch (err) {
      logError("Error pausing Silero VAD:", err);
    }
 // **actually stop the mic** that Silero opened:
 if (sileroVAD.stream) {
   sileroVAD.stream.getTracks().forEach(t => t.stop());
 }
    // **new**: cut the mic feed so the browser indicator goes off
    stopMicrophone();
    // Stop the mic stream so the browser tab indicator turns off
if (pendingVADChunks.length > 0 && !pendingVADLock) {
  pendingVADLock = true;
  try {
    const totalSamples = pendingVADChunks.reduce((sum, seg) => sum + seg.length, 0);
    const combined = new Float32Array(totalSamples);
    let offset = 0;
    for (const seg of pendingVADChunks) {
      combined.set(seg, offset);
      offset += seg.length;
    }
    const wavBlob = encodeWAV(floatTo16BitPCM(combined), 16000, 1);
    enqueueTranscription(wavBlob, chunkNumber++);
    pendingVADChunks = [];
  } finally {
    pendingVADLock = false;
  }
}

    recordingPaused = true;
    // Accumulate elapsed time before pausing
    accumulatedRecordingTime += Date.now() - recordingStartTime;
    clearInterval(recordingTimerInterval);
    pauseResumeButton.innerText = "Resume Recording";
    updateStatusMessage("Recording paused", "orange");
    logInfo("Recording paused; buffered speech flushed");
  }
});

stopButton.addEventListener("click", async () => {
    updateStatusMessage("Finishing transcription...", "blue");
    // --- FORCE-FLUSH the in-flight VAD segment via the public API ---
    // If MicVAD supports endSegment(), use it to emit the last audio
    if (sileroVAD && typeof sileroVAD.endSegment === "function") {
      const result = sileroVAD.endSegment();
      const audio = result?.audio;
      if (audio && audio.length) {
        pendingVADChunks.push(audio);
      }
    }
    // First pause VAD to emit final onSpeechEnd
  if (sileroVAD) {
    try {
      await sileroVAD.pause();     // pause VAD to emit final onSpeechEnd
      logInfo("Silero VAD paused on stop");
    } catch (err) {
      logError("Error pausing Silero VAD on stop:", err);
    }
    // stop the mic Silero opened
    if (sileroVAD.stream) {
      sileroVAD.stream.getTracks().forEach(t => t.stop());
    }
    // destroy the VAD instance to free WASM/model memory
    if (sileroVAD && !sileroVAD._destroyed) {
  sileroVAD._destroyed = true;
  try {
    await sileroVAD.destroy?.();
  } catch (err) {
    logDebug("sileroVAD destroy error:", err);
  }
  sileroVAD = null;
}

  }
  // **new**: absolutely kill the media tracks
  stopMicrophone();

    // — FLUSH and SEND any pending VAD segments before stopping —
if (pendingVADChunks.length > 0 && !pendingVADLock) {
  pendingVADLock = true;
  try {
    const totalSamples = pendingVADChunks.reduce((sum, seg) => sum + seg.length, 0);
    const combined     = new Float32Array(totalSamples);
    let offset         = 0;
    for (const seg of pendingVADChunks) {
      combined.set(seg, offset);
      offset += seg.length;
    }
    const wavBlob = encodeWAV(floatTo16BitPCM(combined), 16000, 1);
    enqueueTranscription(wavBlob, chunkNumber++);
    pendingVADChunks = [];
  } finally {
    pendingVADLock = false;
  }
}

  
    // Flush remaining buffered segments even if below threshold
if (pendingVADChunks.length > 0 && !pendingVADLock) {
  pendingVADLock = true;
  try {
    const totalSamples = pendingVADChunks.reduce((sum, seg) => sum + seg.length, 0);
    const combined = new Float32Array(totalSamples);
    let offset = 0;
    for (const seg of pendingVADChunks) {
      combined.set(seg, offset);
      offset += seg.length;
    }
    const wavBlob = encodeWAV(floatTo16BitPCM(combined), 16000, 1);
    enqueueTranscription(wavBlob, chunkNumber++);
    pendingVADChunks = [];
  } finally {
    pendingVADLock = false;
  }
}

   // ─── NOW compute how many chunks we’re actually waiting on ───
    expectedChunks = enqueuedChunks;
    if (expectedChunks > 0 && !completionTimerInterval) {
      completionStartTime = Date.now();
      completionTimerInterval = setInterval(() => {
        const timerElem = document.getElementById("transcribeTimer");
        if (timerElem) {
          timerElem.innerText = "Completion Timer: " + formatTime(Date.now() - completionStartTime);
        }
      }, 1000);
    }
    manualStop = true;
    clearTimeout(chunkTimeoutId);
    if (recordingTimerInterval) {
      clearInterval(recordingTimerInterval);
      recordingTimerInterval = null;
    }
    // keep existing stopMicrophone, timers and flush logic intact
  // ── If there's nothing left to transcribe (e.g. paused + all chunks done) ──
  if (audioFrames.length === 0 && pendingVADChunks.length === 0) {
    // stop the completion timer if it was running
    clearInterval(completionTimerInterval);

    // reset the displayed timer
    const compTimerElem = document.getElementById("transcribeTimer");
    if (compTimerElem) compTimerElem.innerText = "Completion Timer: 0 sec";

    updateTranscriptionOutput();

    // Re-enable/disable buttons for a fresh start
    const startButton = document.getElementById("startButton");
    if (startButton) startButton.disabled = false;
    const stopButton = document.getElementById("stopButton");
    if (stopButton) stopButton.disabled = true;
    const pauseResumeButton = document.getElementById("pauseResumeButton");
    if (pauseResumeButton) pauseResumeButton.disabled = true;

    logInfo("Stop clicked with no pending audio frames; instant completion.");
    return;
  }

  // NEW: If the recording is paused, finalize immediately.
  if (recordingPaused) {
    finalChunkProcessed = true;
    const compTimerElem = document.getElementById("transcribeTimer");
    if (compTimerElem) {
      compTimerElem.innerText = "Completion Timer: 0 sec";
    }

  
    const startButton = document.getElementById("startButton");
    if (startButton) startButton.disabled = false;
    stopButton.disabled = true;
    const pauseResumeButton = document.getElementById("pauseResumeButton");
    if (pauseResumeButton) pauseResumeButton.disabled = true;
    logInfo("Recording paused and stop pressed; transcription complete without extra processing.");
    return;
  }

  // Continue with the existing logic if not paused:
  if (audioFrames.length === 0 && !processedAnyAudioFrames) {
    // No speech ever detected → treat as instant transcription complete
    resetRecordingState();
    // Force completion timer back to zero
    const compTimerElem = document.getElementById("transcribeTimer");
    if (compTimerElem) compTimerElem.innerText = "Completion Timer: 0 sec";
    // Reset buttons
    const startButton = document.getElementById("startButton");
    if (startButton) startButton.disabled = false;
    stopButton.disabled = true;
    const pauseResumeButton = document.getElementById("pauseResumeButton");
    if (pauseResumeButton) pauseResumeButton.disabled = true;
    logInfo("No audio frames captured; instant transcription complete.");
    return;
  } else {
    if (chunkProcessingLock) {
      pendingStop = true;
      logDebug("Chunk processing locked at stop; setting pendingStop.");
    } else {
      await safeProcessAudioChunk(true);
      if (!processedAnyAudioFrames) {
        resetRecordingState();
        const compTimerElem = document.getElementById("transcribeTimer");
        if (compTimerElem) {
          compTimerElem.innerText = "Completion Timer: 0 sec";
        }
        const recTimerElem = document.getElementById("recordTimer");
        if (recTimerElem) {
          recTimerElem.innerText = "Recording Timer: 0 sec";
        }
        updateStatusMessage("Recording reset. Ready to start.", "green");
        const startButton = document.getElementById("startButton");
        if (startButton) startButton.disabled = false;
        stopButton.disabled = true;
        const pauseResumeButton = document.getElementById("pauseResumeButton");
        if (pauseResumeButton) pauseResumeButton.disabled = true;
        logInfo("No audio frames processed after safeProcessAudioChunk. Full reset performed.");
        processedAnyAudioFrames = false;
        return;
      } else {
        finalChunkProcessed = true;
        finalizeStop();
        logInfo("Stop button processed; final chunk handled.");
      }
    }
  }
});

}

export { initRecording };

// As soon as the page loads, ensure we never auto-open the mic:
window.addEventListener("load", () => {
  stopMicrophone();
  if (sileroVAD && typeof sileroVAD.pause === "function") {
    sileroVAD.pause().catch(() => {});
  }
});
