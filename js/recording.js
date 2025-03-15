// recording.js
// Module for recording audio, processing chunks, and uploading them via the backend.

// Scheduling and backend constants
const MIN_CHUNK_DURATION = 30000; // 30 seconds
const MAX_CHUNK_DURATION = 30000; // 30 seconds
const watchdogThreshold = 1500;   // 1.5 seconds with no frame
const backendUrl = "https://whisper-dev-backend.fly.dev";

// Variables to track recording state
let mediaStream = null;
let audioReader = null;
let recordingStartTime = 0;
let recordingTimerInterval;
let completionTimerInterval = null;
let completionStartTime = 0;
let groupId = null;
let chunkNumber = 1;
let manualStop = false;
let transcriptChunks = {};
let pollingIntervals = {};

let chunkStartTime = 0;
let lastFrameTime = 0;
let chunkTimeoutId;

let chunkProcessingLock = false;
let pendingStop = false;
let finalChunkProcessed = false;  // NEW FLAG to prevent duplicate final chunk processing
let audioFrames = []; // Buffer for audio frames

// --- Utility Functions ---

// Update status message in the UI (expects an element with id "statusMessage")
function updateStatusMessage(message, color = "#333") {
  const statusElem = document.getElementById("statusMessage");
  if (statusElem) {
    statusElem.innerText = message;
    statusElem.style.color = color;
  }
}

// Format milliseconds into a human-readable time string
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

// Update the recording timer (expects an element with id "recordTimer")
function updateRecordingTimer() {
  const elapsed = Date.now() - recordingStartTime;
  const timerElem = document.getElementById("recordTimer");
  if (timerElem) {
    timerElem.innerText = "Recording Timer: " + formatTime(elapsed);
  }
}

// Stop all microphone tracks and cancel the audio reader
function stopMicrophone() {
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
    mediaStream = null;
  }
  if (audioReader) {
    audioReader.cancel();
    audioReader = null;
  }
}

// --- WAV Encoding Helpers ---

function floatTo16BitPCM(input) {
  const output = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    let s = Math.max(-1, Math.min(1, input[i]));
    output[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }
  return output;
}

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

function encodeWAV(samples, sampleRate, numChannels) {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * 2, true);
  view.setUint16(32, numChannels * 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, 'data');
  view.setUint32(40, samples.length * 2, true);
  let offset = 44;
  for (let i = 0; i < samples.length; i++, offset += 2) {
    view.setInt16(offset, samples[i], true);
  }
  return new Blob([view], { type: 'audio/wav' });
}

// --- Chunk Upload and Processing Functions ---

// Upload a WAV blob with retry logic
async function uploadChunk(blob, currentChunkNumber, extension, mimeType, isLast = false, currentGroup) {
  const formData = new FormData();
  formData.append("file", blob, `chunk_${currentChunkNumber}.${extension}`);
  formData.append("group_id", currentGroup);
  formData.append("chunk_number", currentChunkNumber);
  formData.append("api_key", sessionStorage.getItem("openai_api_key"));
  if (isLast) {
    formData.append("last_chunk", "true");
  }
  
  let attempts = 0;
  const retryDelay = 4000; // 4 seconds
  const maxRetryTime = 60000; // 1 minute
  const startTime = Date.now();
  while (true) {
    try {
      const response = await fetch(`${backendUrl}/upload`, {
        method: "POST",
        body: formData
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server responded with status ${response.status}: ${errorText}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      attempts++;
      if (Date.now() - startTime >= maxRetryTime) {
        updateStatusMessage("Failed to upload chunk " + currentChunkNumber + " after maximum retry time", "red");
        throw new Error("Maximum retry time exceeded for chunk " + currentChunkNumber);
      }
      updateStatusMessage("Error uploading chunk " + currentChunkNumber + " (Attempt " + attempts + "): " + error, "red");
      console.error(`Upload error for chunk ${currentChunkNumber} on attempt ${attempts}:`, error);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
}

// Process accumulated audio frames into a WAV blob and upload it
async function processAudioChunkInternal(force = false) {
  if (audioFrames.length === 0) return;
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
  const pcmInt16 = floatTo16BitPCM(pcmFloat32);
  const wavBlob = encodeWAV(pcmInt16, sampleRate, numChannels);
  const mimeType = "audio/wav";
  const extension = "wav";
  const currentChunk = chunkNumber;
  // Upload the chunk and start polling for its transcript
  uploadChunk(wavBlob, currentChunk, extension, mimeType, force, groupId)
    .then(result => {
      if (result && result.session_id) {
        console.log(`Chunk ${currentChunk} uploaded. Session ID: ${result.session_id}`);
        pollChunkTranscript(currentChunk, groupId);
      } else {
        console.log(`Chunk ${currentChunk} upload did not return a session ID; skipping polling.`);
      }
    })
    .catch(err => console.error(`Upload error for chunk ${currentChunk}:`, err));
  chunkNumber++;
}

// Wrapper to ensure one chunk is processed at a time
async function safeProcessAudioChunk(force = false) {
  // Prevent processing final chunk twice when manual stop is active.
  if (manualStop && finalChunkProcessed) return;
  if (chunkProcessingLock) return;
  chunkProcessingLock = true;
  await processAudioChunkInternal(force);
  chunkProcessingLock = false;
  if (pendingStop) {
    pendingStop = false;
    finalizeStop();
  }
}

// After stopping, finalize the process and start a completion timer
function finalizeStop() {
  completionStartTime = Date.now();
  completionTimerInterval = setInterval(() => {
    const timerElem = document.getElementById("transcribeTimer");
    if (timerElem) {
      timerElem.innerText = "Completion Timer: " + formatTime(Date.now() - completionStartTime);
    }
  }, 1000);
  const startButton = document.getElementById("startButton");
  const stopButton = document.getElementById("stopButton");
  const pauseResumeButton = document.getElementById("pauseResumeButton");
  if (startButton) startButton.disabled = false;
  if (stopButton) stopButton.disabled = true;
  if (pauseResumeButton) pauseResumeButton.disabled = true;
  console.log("Recording stopped by user.");
}

// Poll for a transcript of an uploaded chunk
function pollChunkTranscript(chunkNum, currentGroup) {
  const pollStart = Date.now();
  pollingIntervals[chunkNum] = setInterval(async () => {
    if (groupId !== currentGroup) {
      clearInterval(pollingIntervals[chunkNum]);
      return;
    }
    if (Date.now() - pollStart > 60000) {
      console.log(`Polling timeout for chunk ${chunkNum}`);
      clearInterval(pollingIntervals[chunkNum]);
      return;
    }
    try {
      const response = await fetch(`${backendUrl}/fetch_chunk`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ session_id: currentGroup, chunk_number: chunkNum })
      });
      if (response.status === 200) {
        const data = await response.json();
        transcriptChunks[chunkNum] = data.transcript;
        updateTranscriptionOutput();
        clearInterval(pollingIntervals[chunkNum]);
      } else {
        console.log(`Chunk ${chunkNum} transcript not ready yet.`);
      }
    } catch (err) {
      console.error(`Error polling for chunk ${chunkNum}:`, err);
    }
  }, 3000);
}

// Combine transcript chunks and update the UI (expects a textarea with id "transcription")
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
  if (manualStop && Object.keys(transcriptChunks).length >= (chunkNumber - 1)) {
    clearInterval(completionTimerInterval);
    updateStatusMessage("Transcription finished!", "green");
  }
}

// Automatically schedule processing of audio chunks
function scheduleChunk() {
  if (manualStop) return;
  const elapsed = Date.now() - chunkStartTime;
  const timeSinceLast = Date.now() - lastFrameTime;
  if (elapsed >= MAX_CHUNK_DURATION || (elapsed >= MIN_CHUNK_DURATION && timeSinceLast >= watchdogThreshold)) {
    safeProcessAudioChunk();
    chunkStartTime = Date.now();
    scheduleChunk();
  } else {
    chunkTimeoutId = setTimeout(scheduleChunk, 500);
  }
}

// --- Initialization: Set up recording event listeners ---

function initRecording() {
  const startButton = document.getElementById("startButton");
  const stopButton = document.getElementById("stopButton");
  const pauseResumeButton = document.getElementById("pauseResumeButton");
  if (!startButton || !stopButton || !pauseResumeButton) return;

  startButton.addEventListener("click", async () => {
    // Reset state for new recording
    transcriptChunks = {};
    Object.values(pollingIntervals).forEach(interval => clearInterval(interval));
    pollingIntervals = {};
    const transcriptionElem = document.getElementById("transcription");
    if (transcriptionElem) transcriptionElem.value = "";
    chunkStartTime = Date.now();
    lastFrameTime = Date.now();
    clearTimeout(chunkTimeoutId);
    manualStop = false;
    finalChunkProcessed = false;  // Reset the final chunk flag at start
    updateStatusMessage("Recording...", "green");
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      groupId = Date.now().toString();
      chunkNumber = 1;
      audioFrames = [];
      recordingStartTime = Date.now();
      recordingTimerInterval = setInterval(updateRecordingTimer, 1000);
      
      const track = mediaStream.getAudioTracks()[0];
      const processor = new MediaStreamTrackProcessor({ track: track });
      audioReader = processor.readable.getReader();
      
      // Recursive function to continuously read audio frames
      function readLoop() {
        audioReader.read().then(({ done, value }) => {
          if (done) {
            console.log("Audio track reading complete.");
            return;
          }
          lastFrameTime = Date.now();
          audioFrames.push(value);
          readLoop();
        }).catch(err => {
          console.error("Error reading audio frames:", err);
        });
      }
      readLoop();
      scheduleChunk();
      console.log("MediaStreamTrackProcessor started, reading audio frames...");
      startButton.disabled = true;
      stopButton.disabled = false;
      pauseResumeButton.disabled = false;
      pauseResumeButton.innerText = "Pause Recording";
    } catch (error) {
      updateStatusMessage("Microphone access error: " + error, "red");
    }
  });

  stopButton.addEventListener("click", async () => {
    updateStatusMessage("Finishing transcription...", "blue");
    manualStop = true;
    clearTimeout(chunkTimeoutId);
    clearInterval(recordingTimerInterval);
    stopMicrophone();
    chunkStartTime = 0;
    lastFrameTime = 0;
    // Allow any scheduled processing to start
    await new Promise(resolve => setTimeout(resolve, 200));
    if (chunkProcessingLock) {
      pendingStop = true;
    } else {
      await safeProcessAudioChunk(true);
      // Mark that the final chunk has been processed to avoid duplicates.
      finalChunkProcessed = true;
      finalizeStop();
    }
  });

  pauseResumeButton.addEventListener("click", () => {
    if (!mediaStream) return;
    const track = mediaStream.getAudioTracks()[0];
    if (track.enabled) {
      track.enabled = false;
      clearInterval(recordingTimerInterval);
      pauseResumeButton.innerText = "Resume Recording";
      updateStatusMessage("Recording paused", "orange");
    } else {
      track.enabled = true;
      recordingStartTime = Date.now();
      recordingTimerInterval = setInterval(updateRecordingTimer, 1000);
      pauseResumeButton.innerText = "Pause Recording";
      updateStatusMessage("Recording...", "green");
    }
  });
}

export { initRecording };
