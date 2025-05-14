/* root/js/session.js */

export class Session {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.useSessionToken = true;
    this.mediaStream = null;
    this.peerConnection = null;
    this.dataChannel = null;
    this.muted = false;
  }

  async startMicrophone(stream, sessionConfig) {
    await this.startInternal(stream, sessionConfig, "/v1/realtime/sessions");
  }

  async startTranscription(stream, sessionConfig) {
    await this.startInternal(stream, sessionConfig, "/v1/realtime/transcription_sessions");
  }

  stop() {
    if (this.dataChannel) {
      this.dataChannel.close();
      this.dataChannel = null;
    }
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
    this.muted = false;
  }

  mute(muted) {
    this.muted = muted;
    if (this.peerConnection) {
      this.peerConnection.getSenders().forEach(sender => {
        if (sender.track) sender.track.enabled = !muted;
      });
    }
  }

  async startInternal(stream, sessionConfig, endpoint) {
    this.mediaStream = stream;

    // Create the RTCPeerConnection (same as dev sample)
    this.peerConnection = new RTCPeerConnection();

    // DEBUG: Log ICE and signaling state changes for comprehensive debugging
    this.peerConnection.addEventListener('icecandidate', evt => {
      console.log('🧊 ICE candidate:', evt.candidate);
    });
    this.peerConnection.addEventListener('icegatheringstatechange', () => {
      console.log('🧊 ICE gathering state:', this.peerConnection.iceGatheringState);
    });
    this.peerConnection.addEventListener('iceconnectionstatechange', () => {
      console.log('🧊 ICE connection state:', this.peerConnection.iceConnectionState);
      this.oniceconnectionstatechange?.(this.peerConnection.iceConnectionState);
    });
    this.peerConnection.addEventListener('signalingstatechange', () => {
      console.log('🎛️ Signaling state:', this.peerConnection.signalingState);
    });

    // Forward track events
    this.peerConnection.addEventListener('track', e => this.ontrack?.(e));
    this.peerConnection.addTrack(stream.getAudioTracks()[0], stream);
    this.peerConnection.addEventListener('connectionstatechange', () =>
      this.onconnectionstatechange?.(this.peerConnection.connectionState)
    );

    // Data channel for real-time messages
    this.dataChannel = this.peerConnection.createDataChannel('oai_events');
    this.dataChannel.addEventListener('open', () => this.onopen?.());
    this.dataChannel.addEventListener('message', e => {
      try {
        const msg = JSON.parse(e.data);
        this.onmessage?.(msg);
      } catch (err) {
        console.error('Data channel JSON parse error:', err);
      }
    });

    // Create offer and set local description
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);

    // Signal to OpenAI and set remote description
    const answer = await this.signal(offer.sdp, sessionConfig, endpoint);
    await this.peerConnection.setRemoteDescription(answer);
  }

  async signal(sdp, sessionConfig, endpoint) {
    const apiRoot = 'https://api.openai.com';

    if (this.useSessionToken) {
      // 1) Request ephemeral session token
      const sessionUrl = `${apiRoot}${endpoint}`;
      const sessionResp = await fetch(sessionUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'openai-beta': 'realtime-v1',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sessionConfig)
      });
      if (!sessionResp.ok) {
        throw new Error(`Session token request failed: ${sessionResp.status} ${sessionResp.statusText}`);
      }
      const sessionData = await sessionResp.json();
      const clientSecret = sessionData.client_secret.value;

      // 2) Signal SDP using the session token
      const signalResp = await fetch(`${apiRoot}/v1/realtime`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${clientSecret}`,
          'Content-Type': 'application/sdp'
        },
        body: sdp
      });
      if (!signalResp.ok) {
        throw new Error(`Signaling failed: ${signalResp.status} ${signalResp.statusText}`);
      }
      const answerSdp = await signalResp.text();
      return new RTCSessionDescription({ type: 'answer', sdp: answerSdp });
    } else {
      // Fallback: FormData without session token
      const form = new FormData();
      form.append('session', JSON.stringify(sessionConfig));
      form.append('sdp', sdp);
      const resp = await fetch(`${apiRoot}/v1/realtime`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${this.apiKey}` },
        body: form
      });
      if (!resp.ok) {
        throw new Error(`Signaling failed: ${resp.status} ${resp.statusText}`);
      }
      const answerSdp = await resp.text();
      return new RTCSessionDescription({ type: 'answer', sdp: answerSdp });
    }
  }

  /**
   * Send a control message over the data channel
   */
  sendMessage(message) {
    this.dataChannel?.send(JSON.stringify(message));
  }
}
