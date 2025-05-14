// root/js/session.js

/**
 * Session handles WebRTC + HTTP signaling for OpenAI’s Realtime API.
 * Enhanced with detailed debug logging for troubleshooting.
 */
export class Session {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.useSessionToken = true;
    this.ms = null;
    this.pc = null;
    this.dc = null;
    this.muted = false;
  }

  /**
   * Start a transcription session.
   */
  async startTranscription(stream, sessionConfig) {
    console.debug('[Session] startTranscription()');
    return this.startInternal(stream, sessionConfig, '/v1/realtime/transcription_sessions');
  }

  /**
   * Tear down the PeerConnection and media tracks.
   */
  stop() {
    console.debug('[Session] stop()');
    this.dc?.close();
    this.dc = null;
    this.pc?.close();
    this.pc = null;
    this.ms?.getTracks().forEach(t => t.stop());
    this.ms = null;
    this.muted = false;
  }

  /**
   * Mute or unmute the outbound audio (pause/resume).
   */
  mute(muted) {
    console.debug(`[Session] mute(${muted})`);
    this.muted = muted;
    this.pc.getSenders().forEach(sender => {
      if (sender.track) sender.track.enabled = !muted;
    });
  }

  /**
   * Internal logic: create offer, perform signaling, and apply answer.
   */
  async startInternal(stream, sessionConfig, tokenEndpoint) {
    console.debug('[Session] startInternal()', { tokenEndpoint, sessionConfig });
    this.ms = stream;
    this.pc = new RTCPeerConnection();

    // Detailed RTC event logging
    this.pc.onicecandidate = event => console.debug('[Session] ICE candidate:', event.candidate);
    this.pc.onsignalingstatechange = () => console.debug('[Session] signalingState:', this.pc.signalingState);
    this.pc.onicegatheringstatechange = () => console.debug('[Session] iceGatheringState:', this.pc.iceGatheringState);
    this.pc.onconnectionstatechange = () => console.debug('[Session] connectionState:', this.pc.connectionState);
    this.pc.ontrack = e => this.ontrack?.(e);
    this.pc.addTrack(stream.getTracks()[0]);

    // DataChannel for control & transcripts
    this.dc = this.pc.createDataChannel('oai-events');
    this.dc.onopen    = () => console.debug('[Session] DataChannel open');
    this.dc.onmessage = e => {
      let data;
      try { data = JSON.parse(e.data); }
      catch (err) { console.error('[Session] DC parse error:', err); return; }
      console.debug('[Session] DC message:', data);
      this.onmessage?.(data);
    };

    // SDP offer
    const offer = await this.pc.createOffer();
    console.debug('[Session] SDP offer:', offer.sdp.slice(0, 120) + '…');
    await this.pc.setLocalDescription(offer);

    // HTTP signaling
    try {
      const answer = await this.signal(offer, sessionConfig, tokenEndpoint);
      console.debug('[Session] Received SDP answer');
      await this.pc.setRemoteDescription(answer);
    } catch (err) {
      console.error('[Session] Signaling error:', err);
      this.onerror?.(err);
    }
  }

  /**
   * Exchange SDP via Fetch: obtain token, then send raw SDP.
   */
  async signal(offer, sessionConfig, tokenEndpoint) {
    console.debug('[Session] signal()', { tokenEndpoint });
    const urlRoot     = 'https://api.openai.com';
    const realtimeUrl = `${urlRoot}/v1/realtime`;
    let resp;

    if (this.useSessionToken) {
      console.debug('[Session] Requesting session token');
      const tokenRes = await fetch(`${urlRoot}${tokenEndpoint}`, {
        method:  'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'openai-beta':   'realtime-v1',
          'Content-Type':  'application/json'
        },
        body:    JSON.stringify(sessionConfig)
      });
      console.debug('[Session] tokenRes status:', tokenRes.status);
      const tokenJson = await tokenRes.clone().json().catch(() => ({}));
      console.debug('[Session] tokenRes json:', tokenJson);
      if (!tokenRes.ok) {
        const errText = await tokenRes.text();
        console.error('[Session] token error text:', errText);
        throw new Error(`Token request failed: ${tokenRes.status}`);
      }
      const clientSecret = tokenJson.client_secret?.value;
      console.debug('[Session] Obtained clientSecret');

      console.debug('[Session] POSTing SDP to realtime endpoint');
      resp = await fetch(realtimeUrl, {
        method:  'POST',
        headers: {
          'Authorization': `Bearer ${clientSecret}`,
          'Content-Type':  'application/sdp'
        },
        body:    offer.sdp
      }).catch(err => { console.error('[Session] SDP fetch failed:', err); throw err; });
      console.debug('[Session] SDP response status:', resp.status);
      if (!resp.ok) {
        const errText = await resp.text();
        console.error('[Session] SDP error text:', errText);
        throw new Error(`Signal failed: ${resp.status}`);
      }
    } else {
      console.debug('[Session] Fallback: direct SDP with API key');
      const form = new FormData();
      form.append('session', JSON.stringify(sessionConfig));
      form.append('sdp', offer.sdp);
      resp = await fetch(realtimeUrl, {
        method:  'POST',
        headers: { 'Authorization': `Bearer ${this.apiKey}` },
        body:    form
      }).catch(err => { console.error('[Session] fallback SDP error:', err); throw err; });
      console.debug('[Session] fallback SDP status:', resp.status);
      if (!resp.ok) {
        const errText = await resp.text();
        console.error('[Session] fallback error text:', errText);
        throw new Error(`Fallback signal failed: ${resp.status}`);
      }
    }

    const answerSdp = await resp.text();
    console.debug('[Session] Answer SDP snippet:', answerSdp.slice(0,120) + '…');
    return { type: 'answer', sdp: answerSdp };
  }

  /**
   * Send a control message over the DataChannel.
   */
  sendMessage(message) {
    console.debug('[Session] sendMessage()', message);
    this.dc.send(JSON.stringify(message));
  }
}
