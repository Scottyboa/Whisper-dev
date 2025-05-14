export default class Session {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.useSessionToken = true;
    this.ms = null;
    this.pc = null;
    this.dc = null;
  }

  /**
   * Start a real-time transcription session
   * @param {MediaStream} stream - MediaStream from microphone or audio element
   * @param {Object} sessionConfig - Configuration for transcription (model, prompt, turn detection)
   */
  async startTranscription(stream, sessionConfig) {
    await this.startInternal(stream, sessionConfig, "/v1/realtime/transcription_sessions");
  }

  async startInternal(stream, sessionConfig, sessionEndpoint) {
    this.ms = stream;
    this.pc = new RTCPeerConnection();

    // Forward connection state changes
    this.pc.onconnectionstatechange = () => {
      if (this.onconnectionstatechange) {
        this.onconnectionstatechange(this.pc.connectionState);
      }
    };

    // Add all audio tracks to the peer connection
    for (const track of stream.getTracks()) {
      this.pc.addTrack(track, stream);
    }

    // Create a DataChannel for receiving transcription events
    this.dc = this.pc.createDataChannel("openai");
    this.dc.onopen = () => {
      // Connection open
    };
    this.dc.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (this.onmessage) this.onmessage(message);
      } catch (err) {
        console.error("Failed to parse message:", err);
      }
    };
    this.dc.onerror = (err) => {
      if (this.onerror) this.onerror(err);
    };

    // Create SDP offer
    const offer = await this.pc.createOffer();
    await this.pc.setLocalDescription(offer);

    // Signal to OpenAI and receive SDP answer
    const answer = await this.signal(offer, sessionConfig, sessionEndpoint);
    await this.pc.setRemoteDescription(answer);
  }

  async signal(offer, sessionConfig, sessionEndpoint) {
    let token = this.apiKey;

    // 1) Create a session and retrieve session token
    if (this.useSessionToken) {
      const createRes = await fetch(`https://api.openai.com${sessionEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(sessionConfig),
      });
      if (!createRes.ok) {
        throw new Error(`Session creation failed: ${createRes.statusText}`);
      }
      const data = await createRes.json();
      token = data.client_secret?.value || data.session?.token;
      if (!token) throw new Error("No session token returned");
    }

    // 2) Send SDP offer to signaling endpoint
    const formData = new FormData();
    formData.append("sdp", offer.sdp);
    const signalRes = await fetch(`https://api.openai.com/v1/realtime`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}` },
      body: formData,
    });
    if (!signalRes.ok) {
      const text = await signalRes.text();
      throw new Error(`Signaling failed: ${text}`);
    }
    const sdpAnswer = await signalRes.text();
    return { type: "answer", sdp: sdpAnswer };
  }

  /**
   * Send a custom message over the DataChannel
   */
  sendMessage(message) {
    if (this.dc && this.dc.readyState === "open") {
      this.dc.send(JSON.stringify(message));
    }
  }

  /**
   * Clean up: close DataChannel, PeerConnection, and stop tracks
   */
  close() {
    this.dc?.close();
    this.pc?.close();
    if (this.ms) {
      this.ms.getTracks().forEach(track => track.stop());
    }
    this.ms = null;
    this.pc = null;
    this.dc = null;
  }
}
