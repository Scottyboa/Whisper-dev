// session.js
export class Session {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.useSessionToken = true;
    this.ms = null;
    this.pc = null;
    this.dc = null;
    this.muted = false;
  }

  async start(stream, sessionConfig) {
    await this.startInternal(stream, sessionConfig, "/v1/realtime/sessions");
  }

  async startTranscription(stream, sessionConfig) {
    await this.startInternal(stream, sessionConfig, "/v1/realtime/transcription_sessions");
  }

  stop() {
    this.dc?.close();
    this.dc = null;
    this.pc?.close();
    this.pc = null;
    this.ms?.getTracks().forEach(t => t.stop());
    this.ms = null;
    this.muted = false;
  }

  mute(muted) {
    this.muted = muted;
    this.pc.getSenders().forEach(sender => sender.track.enabled = !muted);
  }

  async startInternal(stream, sessionConfig, tokenEndpoint) {
    this.ms = stream;
    this.pc = new RTCPeerConnection();
    this.pc.ontrack = e => this.ontrack?.(e);
    this.pc.onconnectionstatechange = () => this.onconnectionstatechange?.(this.pc.connectionState);
    this.pc.addTrack(stream.getTracks()[0]);

    this.dc = this.pc.createDataChannel("");
    this.dc.onopen = e => this.onopen?.(e);
    this.dc.onmessage = e => this.onmessage?.(JSON.parse(e.data));

    const offer = await this.pc.createOffer();
    await this.pc.setLocalDescription(offer);

    try {
      const answer = await this.signal(offer, sessionConfig, tokenEndpoint);
      await this.pc.setRemoteDescription(answer);
    } catch (err) {
      this.onerror?.(err);
    }
  }

  async signal(offer, sessionConfig, tokenEndpoint) {
    const urlRoot = "https://api.openai.com";
    const realtimeUrl = `${urlRoot}/v1/realtime`;
    let sdpResponse;

    if (this.useSessionToken) {
      const sessionRes = await fetch(`${urlRoot}${tokenEndpoint}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "openai-beta": "realtime-v1",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sessionConfig),
      });
      if (!sessionRes.ok) throw new Error("Failed to request session token");
      const sessionData = await sessionRes.json();
      const clientSecret = sessionData.client_secret.value;

      sdpResponse = await fetch(realtimeUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${clientSecret}`,
          "Content-Type": "application/sdp"
        },
        body: offer.sdp
      });
      if (!sdpResponse.ok) throw new Error("Failed to signal");
    } else {
      const form = new FormData();
      form.append("session", JSON.stringify(sessionConfig));
      form.append("sdp", offer.sdp);
      sdpResponse = await fetch(realtimeUrl, {
        method: "POST",
        headers: { "Authorization": `Bearer ${this.apiKey}` },
        body: form
      });
      if (!sdpResponse.ok) throw new Error("Failed to signal");
    }

    return { type: "answer", sdp: await sdpResponse.text() };
  }

  sendMessage(msg) {
    this.dc.send(JSON.stringify(msg));
  }
}
