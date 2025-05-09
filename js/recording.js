// recording.js
// Real-time streaming transcription using GPT-4o Realtime Preview via WebRTC

// --- Utility & Logging Functions (unchanged) ---
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return (hash >>> 0).toString();
}

const DEBUG = true;
function logDebug(message, ...optionalParams) {
  if (DEBUG) console.debug(new Date().toISOString(), "[DEBUG]", message, ...optionalParams);
}
function logInfo(message, ...optionalParams) {
  console.info(new Date().toISOString(), "[INFO]", message, ...optionalParams);
}
function logError(message, ...optionalParams) {
  console.error(new Date().toISOString(), "[ERROR]", message, ...optionalParams);
}

// --- Recording Timer & Status (unchanged) ---
let mediaStream = null;
let recordingStartTime = 0;
let accumulatedRecordingTime = 0;
let recordingTimerInterval = null;

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
}

// --- Base64 Helper Functions (unchanged) ---
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

// --- Device Token Management (unchanged) ---
function getDeviceToken() {
  let token = localStorage.getItem("device_token");
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem("device_token", token);
  }
  return token;
}

// --- API Key Retrieval (unchanged) ---
function getAPIKey() {
  return sessionStorage.getItem("user_api_key");
}

// --- File Blob Processing (unchanged) ---
async function encryptFileBlob(blob) {
  const apiKey = getAPIKey();
  if (!apiKey) throw new Error("API key not available");
  const deviceToken = getDeviceToken();
  const apiKeyMarker = hashString(apiKey);
  const deviceMarker = hashString(deviceToken);
  return {
    encryptedBlob: blob,
    iv: "",
    salt: "",
    apiKeyMarker,
    deviceMarker
  };
}

// --- Ephemeral Token Fetching (new) ---
async function fetchEphemeralToken() {
  const res = await fetch('/api/ephemeral_tokens', { method: 'POST' });
  if (!res.ok) throw new Error(`Failed to fetch ephemeral token: ${res.status} ${res.statusText}`);
  const data = await res.json();
  return data.client_secret;  // { client_secret: "ek_...", expires_at: ... }
}

// --- Real-time Transcription Setup (replaces Whisper chunking) ---
function initRecording() {
  const startButton = document.getElementById("startButton");
  const stopButton  = document.getElementById("stopButton");
  const transcriptionElem = document.getElementById("transcription");

  let pc, socket;

  startButton.addEventListener("click", async () => {
    startButton.disabled = true;
    updateStatusMessage("Connecting...", "#666");
    try {
      // Start recording timer
      recordingStartTime = Date.now();
      recordingTimerInterval = setInterval(updateRecordingTimer, 1000);

      // 1) Fetch ephemeral token
      const token = await fetchEphemeralToken();

      // 2) Open WebSocket to OpenAI Realtime API
      socket = new WebSocket(
        `wss://realtime.openai.com/ws?model=gpt-4o-realtime-preview&token=${token}`
      );

      socket.addEventListener("open", () => {
        updateStatusMessage("Realtime connection open", "green");
        logInfo("WebSocket opened");
      });
      socket.addEventListener("error", err => {
        logError("WebSocket error", err);
        updateStatusMessage("WebSocket error", "red");
      });
      socket.addEventListener("message", async ev => {
        const msg = JSON.parse(ev.data);
        if (msg.sdp) {
          await pc.setRemoteDescription(msg);
        }
        if (msg.candidate) {
          await pc.addIceCandidate(msg.candidate);
        }
        if (msg.transcript) {
          transcriptionElem.value += msg.transcript.text;
        }
      });

      // 3) Set up WebRTC peer connection
      pc = new RTCPeerConnection();
      pc.addEventListener("icecandidate", e => {
        if (e.candidate) socket.send(JSON.stringify({ candidate: e.candidate }));
      });

      // 4) Capture mic audio and add to peer connection
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.getTracks().forEach(track => pc.addTrack(track, mediaStream));

      // 5) Create SDP offer and send
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.send(JSON.stringify({ sdp: pc.localDescription }));

      stopButton.disabled = false;
    } catch (err) {
      logError(err);
      updateStatusMessage(`Error: ${err.message}`, "red");
      startButton.disabled = false;
      clearInterval(recordingTimerInterval);
    }
  });

  stopButton.addEventListener("click", () => {
    updateStatusMessage("Stopping...", "#666");
    // Stop recording timer
    if (recordingTimerInterval) clearInterval(recordingTimerInterval);
    accumulatedRecordingTime += Date.now() - recordingStartTime;

    // Tear down streams and connections
    if (mediaStream) mediaStream.getTracks().forEach(t => t.stop());
    if (pc) pc.close();
    if (socket) socket.close();

    updateStatusMessage("Stopped", "orange");
    startButton.disabled = false;
    stopButton.disabled = true;
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRecording);
} else {
  initRecording();
}

export { initRecording };
