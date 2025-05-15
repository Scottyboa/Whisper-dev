// root/js/recording.js

const API_BASE    = "https://api.openai.com";
const SESSION_URL = `${API_BASE}/v1/realtime/transcription_sessions`;
const REALTIME_URL= `${API_BASE}/v1/realtime`;

export function initRecording() {
  const startBtn       = document.getElementById("startButton");
  const stopBtn        = document.getElementById("stopButton");
  const statusMsg      = document.getElementById("statusMessage");
  const transcriptArea = document.getElementById("transcription");

  let pc, dc, stream, sessionId, clientSecret;

  // Initial button state
  startBtn.disabled = false;
  stopBtn.disabled  = true;

  startBtn.addEventListener("click", startRecording);
  stopBtn.addEventListener("click", stopRecording);

  async function startRecording() {
    transcriptArea.value = "";
    updateStatus("Starting…");

    const apiKey = sessionStorage.getItem("user_api_key");
    if (!apiKey) return updateStatus("Error: API key missing");

    // 1️⃣ Get mic
    try {
      updateStatus("Accessing microphone…");
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      return updateStatus("Mic error: " + err.message);
    }

// 4️⃣ Signal (exactly like the Dev’s `signal()`)
//    — first request the session token …
updateStatus("Signaling & SDP exchange…");

let sessionData;
try {
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
  sessionData    = await sessionResp.json();
  sessionId      = sessionData.id;
  clientSecret   = sessionData.client_secret.value;
} catch (err) {
  cleanup();
  return updateStatus("Session error: " + err.message);
}

//    …then immediately POST the SDP to /v1/realtime
try {
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
  await pc.setRemoteDescription({ type: "answer", sdp: answerSdp });
} catch (err) {
  cleanup();
  return updateStatus("SDP error: " + err.message);
}

      console.log("Session created", sessionId);
    } catch (err) {
      cleanup();
      return updateStatus("Session error: " + err.message);
    }

    // 3️⃣ Setup PeerConnection + DataChannel
    // Match DEV: default PeerConnection (no custom ICE servers)
    // Use STUN server so host candidates include reflexive address
    pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    });

    // Mirror DEV: update UI on connection state changes
    pc.onconnectionstatechange = () => updateStatus(pc.connectionState);

    // Log ICE candidates (they’ll be auto-trickled)
    pc.onicecandidate = evt => console.log("ICE candidate", evt.candidate);
    pc.onicecandidate = evt => console.log("ICE candidate", evt.candidate);
    pc.onconnectionstatechange = () => console.log("PC state:", pc.connectionState);
    pc.addTrack(stream.getTracks()[0], stream);

    // empty label to match dev example
    dc = pc.createDataChannel("");
dc.onopen = () => {
  console.log("▶️ DataChannel open");
  updateStatus("Connected");
  startBtn.disabled = true;
  stopBtn.disabled  = false;
};

    dc.onmessage = e => handleEvent(JSON.parse(e.data));
    dc.onclose   = () => console.log("❌ DataChannel closed");

    // 4️⃣ Offer & immediate SDP POST (trickle ICE)
    try {
      updateStatus("Creating SDP…");
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      console.log("Offer SDP", offer.sdp.split("\n")[0]);

      updateStatus("Exchanging SDP…");
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
      return updateStatus("SDP error: " + err.message);
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
    dc?.close(); dc = null;
    pc?.close(); pc = null;
    stream?.getTracks().forEach(t => t.stop()); stream = null;
    startBtn.disabled = false;
    stopBtn.disabled  = true;
  }

  function updateStatus(txt) {
    statusMsg.textContent = txt;
  }
}
