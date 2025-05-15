// root/js/recording.js

const SESSIONS_URL = "https://api.openai.com/v1/realtime/transcription_sessions";
const WEBRTC_URL = "https://api.openai.com/v1/realtime?use-case=transcription";

export function initRecording() {
  const startBtn       = document.getElementById("startButton");
  const stopBtn        = document.getElementById("stopButton");
  const pauseResumeBtn = document.getElementById("pauseResumeButton");
  const statusMsg      = document.getElementById("statusMessage");
  const transcriptArea = document.getElementById("transcription");

  let pc, dc, localStream, sessionId, ephemeralKey, isPaused = false;

  // Initial button state
  startBtn.disabled       = false;
  stopBtn.disabled        = true;
  pauseResumeBtn.disabled = true;

  startBtn.addEventListener("click", startRecording);
  stopBtn.addEventListener("click", stopRecording);
  pauseResumeBtn.addEventListener("click", togglePause);

  async function startRecording() {
    try {
      // Clear out any old transcript
      transcriptArea.value = "";
      updateUI("Initializing…");

      const apiKey = sessionStorage.getItem("user_api_key");
      if (!apiKey) throw new Error("API key missing in sessionStorage");

      // 1️⃣ Create transcription session
      const resp = await fetch(SESSIONS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "x-openai-api-data-collection-opt-out": "true"
        },
        body: JSON.stringify({
          input_audio_format: "pcm16",
          input_audio_transcription: { model: "gpt-4o-transcribe" }
        })
      });
      if (!resp.ok) throw new Error(`Session creation failed (${resp.status})`);
      const data = await resp.json();
      sessionId    = data.id;
      ephemeralKey = data.client_secret.value;
      updateUI("Session created; opening mic…");
  try {
    updateUI("Requesting mic access…");
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    updateUI("Mic access granted; setting up WebRTC…");
  } catch (err) {
    updateUI("Error accessing mic: " + err.message);
    console.error(err);
    return;
  }
      pc = new RTCPeerConnection();
      localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

      // Not used, but shows how you'd play returned audio
      pc.ontrack = ({ streams }) => {
        const out = new Audio();
        out.autoplay = true;
        out.srcObject = streams[0];
        document.body.appendChild(out);
      };

      // 3️⃣ DataChannel for events
      dc = pc.createDataChannel("oai-events");
      dc.onopen = () => {
        updateUI("Connected; sending session.connect…");
        dc.send(JSON.stringify({
          type: "session.connect",
          session: { id: sessionId, client_secret: ephemeralKey }
        }));
        updateUI("Transcribing…");
      };
      dc.onmessage = handleEvent;

      // 5️⃣ SDP Offer
      try {
        updateUI("Creating SDP offer…");
        const offer = await pc.createOffer();
        console.log("Offer SDP:", offer.sdp.substring(0,100));
        updateUI("Setting local description…");
        await pc.setLocalDescription(offer);
+  // 🚧 Wait for ICE gathering to complete before sending to OpenAI
+  if (pc.iceGatheringState !== "complete") {
+    await new Promise(resolve => {
+      function check() {
+        if (pc.iceGatheringState === "complete") {
+          pc.removeEventListener("icegatheringstatechange", check);
+          resolve();
+        }
+      }
+      pc.addEventListener("icegatheringstatechange", check);
+    });
+  }
        updateUI("Local description set; sending to server…");
      } catch(err) {
        console.error("SDP offer error:", err);
        updateUI("SDP offer/setup error: " + err.message);
        return;
      }

      // 6️⃣ SDP Exchange
      try {
        console.log("Calling fetch to", WEBRTC_URL);
        updateUI("Exchanging SDP with OpenAI…");
        const sdpResp = await fetch(WEBRTC_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/sdp",
            "Authorization": `Bearer ${ephemeralKey}`
          },
          body: pc.localDescription.sdp
        });
        console.log("SDP fetch status:", sdpResp.status);
        if (!sdpResp.ok) throw new Error(`HTTP ${sdpResp.status}`);
        const answerSdp = await sdpResp.text();
        console.log("Answer SDP:", answerSdp.substring(0,100));
        updateUI("Applying remote description…");
        await pc.setRemoteDescription({ type: "answer", sdp: answerSdp });
        updateUI("WebRTC connected; waiting for transcription…");
      } catch(err) {
        console.error("SDP exchange error:", err);
        updateUI("SDP exchange error: " + err.message);
        return;
      }

      // Toggle buttons
      startBtn.disabled       = true;
      stopBtn.disabled        = false;
      pauseResumeBtn.disabled = false;
      isPaused = false;
      pauseResumeBtn.textContent = "Pause Recording";
    } catch (err) {
      updateUI("Error: " + err.message);
      console.error(err);
    }
  }

  function handleEvent(evt) {
    const msg = JSON.parse(evt.data);

    // Interim transcript
    if (msg.type === "conversation.item.input_audio_transcription.delta") {
      transcriptArea.value = msg.delta.text;
    }
    // Final transcript
    else if (msg.type === "conversation.item.audio_transcription.completed") {
      transcriptArea.value += msg.data.transcription.text + "\n";
    }
    // Session fully ended
    else if (msg.type === "session.end") {
      updateUI("Session ended");
      cleanup();
    }
  }

  function togglePause() {
    if (!localStream) return;
    isPaused = !isPaused;
    localStream.getAudioTracks().forEach(t => t.enabled = !isPaused);
    pauseResumeBtn.textContent = isPaused ? "Resume" : "Pause";
    updateUI(isPaused ? "Paused" : "Resumed");
  }

  function stopRecording() {
    if (dc && dc.readyState === "open") {
      // politely tell OpenAI to finish up
      dc.send(JSON.stringify({ type: "session.disconnect" }));
      updateUI("Disconnecting… waiting for final transcript");
    }
    // stop sending mic audio immediately
    if (localStream) {
      localStream.getTracks().forEach(t => t.stop());
    }
    // disable Stop so you can't spam it
    stopBtn.disabled = true;
  }

  function cleanup() {
    // fully tear down WebRTC
    if (dc) dc.close();
    if (pc) pc.close();
    pc = dc = localStream = null;

    // reset buttons
    startBtn.disabled       = false;
    stopBtn.disabled        = true;
    pauseResumeBtn.disabled = true;
    pauseResumeBtn.textContent = "Pause Recording";
  }

  function updateUI(msg) {
    statusMsg.textContent = msg;
  }
}
