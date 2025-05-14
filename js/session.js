// js/session.js

// Utility to pull your OpenAI key out of sessionStorage
function getAPIKey() {
  return sessionStorage.getItem('user_api_key');
}

export class Session {
  constructor(apiKey) {
    // allow passing key explicitly or default to sessionStorage
    this.apiKey = apiKey || getAPIKey();
    this.useSessionToken = true;
    this.ms = null;
    this.pc = null;        
    this.dc = null;
    this.muted = false;
  }

  // for raw audio/video sessions
  async start(stream, sessionConfig) {  
    await this._startInternal(stream, sessionConfig, "/v1/realtime/sessions");
  }

  // for transcription (gpt-4o-transcribe)
  async startTranscription(stream, sessionConfig) {
    await this._startInternal(stream, sessionConfig, "/v1/realtime/transcription_sessions");
  }

  // cleanly tear everything down
  stop() {  
    if (this.dc) {
      this.dc.close();
      this.dc = null;
    }
    if (this.pc) {
      this.pc.close();
      this.pc = null;
    }
    if (this.ms) {
      this.ms.getTracks().forEach(t => t.stop());
      this.ms = null;
    }
    this.muted = false;
  }

  // enable/disable sending audio
  mute(muted) {
    this.muted = muted;
    if (this.pc) {
      this.pc.getSenders().forEach(sender => sender.track.enabled = !muted);
    }
  }

  // internal wiring for WebRTC + DataChannel
  async _startInternal(stream, sessionConfig, tokenEndpoint) {
    this.ms = stream;
    this.pc = new RTCPeerConnection({
      iceServers: [{ urls: ['stun:stun.openai.com:443'] }]
    });

    // forward events if you've set them
    this.pc.ontrack = e => this.ontrack?.(e);
    this.pc.onconnectionstatechange = () => this.onconnectionstatechange?.(this.pc.connectionState);

    // add your audio track
    this.pc.addTrack(stream.getTracks()[0], stream);

    // create a DataChannel for transcript messages
    this.dc = this.pc.createDataChannel("transcripts");
    this.dc.onopen    = () => this.onopen?.();
    this.dc.onmessage = e => {
      try {
        const msg = JSON.parse(e.data);
        this.onmessage?.(msg);
      } catch(err) {
        console.warn("Invalid DataChannel message:", e.data);
      }
    };

    // SDP offer/answer handshake
    const offer = await this.pc.createOffer();
    await this.pc.setLocalDescription(offer);
    try {
      const answer = await this._signal(offer, sessionConfig, tokenEndpoint);
      await this.pc.setRemoteDescription(answer);
    } catch (err) {
      this.onerror?.(err);
    }
  }

  // fetches an ephemeral client_secret & does the SDP POST
  async _signal(offer, sessionConfig, tokenEndpoint) {
    const apiKey      = this.apiKey;
    const urlRoot     = "https://api.openai.com";
    const sessionUrl  = `${urlRoot}${tokenEndpoint}`;
    const realtimeUrl = `${urlRoot}/v1/realtime`;

    // 1) create /v1/realtime/transcription_sessions (or sessions)
    const sessResp = await fetch(sessionUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "openai-beta": "realtime-v1",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sessionConfig),
    });
    if (!sessResp.ok) {
      throw new Error(`Session token error: ${sessResp.status}`);
    }
    const { client_secret } = await sessResp.json();

    // 2) send SDP offer and get answer SDP back
    const sdpResp = await fetch(realtimeUrl, {
      method: "POST",
      body: offer.sdp,
      headers: {
        Authorization: `Bearer ${client_secret.value || client_secret}`,
        "Content-Type": "application/sdp"
      },
    });
    if (!sdpResp.ok) {
      throw new Error(`SDP signal failed: ${sdpResp.status}`);
    }
    const answerSdp = await sdpResp.text();
    return { type: "answer", sdp: answerSdp };
  }

  // helper to send any JSON message over the data channel
  sendMessage(msg) {
    if (this.dc && this.dc.readyState === "open") {
      this.dc.send(JSON.stringify(msg));
    }
  }
}
