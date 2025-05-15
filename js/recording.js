// root/js/recording.js

const API_BASE     = "https://api.openai.com";
const SESSION_URL  = `${API_BASE}/v1/realtime/transcription_sessions`;
const REALTIME_URL = `${API_BASE}/v1/realtime`;

export function initRecording() {
  const startBtn       = document.getElementById("startButton");
  const stopBtn        = document.getElementById("stopButton");
  const statusMsg      = document.getElementById("statusMessage");
  const transcriptArea = document.getElementById("transcription");

  let pc, dc, stream, sessionId, clientSecret, apiKey;

  // Idle state
  startBtn.disabled = false;
  stopBtn.disabled  = true;

  startBtn.addEventListener("click", startRecording);
  stopBtn.addEventListener("click", stopRecording);

  async function startRecording() {
    transcriptArea.value = "";
    updateStatus("Starting…");

    apiKey = sessionStorage.getItem("user_api_key");
    if (!apiKey) {
      return updateStatus("Error: API key missing");
    }

    // 1️⃣ Get microphone stream
    try {
      updateStatus("Accessing microphone…");
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      return updateStatus("Mic error: " + err.message);
    }

    // 2️⃣ Build PeerConnection & DataChannel
    pc = new RTCPeerConnection();
    pc.onicecandidate = evt => console.log("ICE candidate", evt.candidate);
    pc.onconnectionstatechange = () => updateStatus(pc.connectionState);
    pc.addTrack(stream.getTracks()[0], stream);

    dc = pc.createDataChannel("");
    dc.onopen = () => {
      console.log("▶️ DataChannel open");
      updateStatus("Connected");
      startBtn.disabled = true;
      stopBtn.disabled  = false;
    };
    dc.onmessage = e => handleEvent(JSON.parse(e.data));
    dc.onclose   = () => console.log("❌ DataChannel closed");

    // 3️⃣ Create SDP offer
    updateStatus("Creating SDP…");
    let offer;
    try {
      offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      console.log("Offer SDP v=0");
    } catch (err) {
      cleanup();
      return updateStatus("Offer error: " + err.message);
    }

    // 4️⃣ Signal (session token + SDP exchange)
    updateStatus("Signaling & SDP exchange…");
    try {
      // 4a) create transcription session
      const sessionResp = await fetch(SESSION_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "openai-beta":   "realtime-v1",
          "Content-Type":  "application/json"
        },
        body: JSON.stringify({
          input_audio_transcription: { model: "gpt-4o-transcribe" }
        })
      });
      if (!sessionResp.ok) throw new Error(`HTTP ${sessionResp.status}`);
      const sessionData  = await sessionResp.json();
      sessionId          = sessionData.id;
      clientSecret       = sessionData.client_secret.value;
      console.log("Session created", sessionId);

      // 4b) post SDP to /v1/realtime
      const sdpResp = await fetch(REALTIME_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${clientSecret}`,
          "Content-Type":  "application/sdp"
        },
        body: pc.localDescription.sdp
      });
      if (!sdpResp.ok) throw new Error(`HTTP ${sdpResp.status}`);
      const answerSdp = await sdpResp.text();
      console.log("Answer SDP received");
      await pc.setRemoteDescription({ type: "answer", sdp: answerSdp });
    } catch (err) {
      cleanup();
      return updateStatus("Signal error: " + err.message);
    }
  }

  function handleEvent(msg) {
    switch (msg.type) {
      case "conversation.item.input_audio_transcription.delta":
        transcriptArea.value = msg.delta.text;
        break;
      case "conversation.item.audio_transcription.completed":
        transcriptArea.value += msg.data.transcription.text + "\n";
        break;
      case "session.end":
        updateStatus("Session ended");
        cleanup();
        break;
    }
  }

  function stopRecording() {
    cleanup();
    updateStatus("Stopped");
  }

  function cleanup() {
    dc?.close();    dc = null;
    pc?.close();    pc = null;
    stream?.getTracks().forEach(t => t.stop());
    stream = null;
    startBtn.disabled = false;
    stopBtn.disabled  = true;
  }

  function updateStatus(txt) {
    statusMsg.textContent = txt;
  }
}
