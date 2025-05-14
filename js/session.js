// root/js/session.js

/**
 * Session handles the WebRTC + HTTP signaling for OpenAI’s Realtime API.
 * Import this as:
 *   import { Session } from './session.js';
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
   * Start a generic realtime session (not used by recording.js)
   */
  async start(stream, sessionConfig) {
    await this.startInternal(stream, sessionConfig, '/v1/realtime/sessions');
  }

  /**
   * Start a transcription session.
   * @param {MediaStream} stream
   * @param {object} sessionConfig
   */
  async startTranscription(stream, sessionConfig) {
    await this.startInternal(stream, sessionConfig, '/v1/realtime/transcription_sessions');
  }

  /**
   * Tear down the PeerConnection and media tracks.
   */
  stop() {
    this.dc?.close();
    this.dc = null;
    this.pc?.close();
    this.pc = null;
    this.ms?.getTracks().forEach(t => t.stop());
    this.ms = null;
    this.muted = false;
  }

  /**
   * Mute or unmute the outbound audio (used for Pause/Resume).
   * @param {boolean} muted
   */
  mute(muted) {
    this.muted = muted;
    this.pc.getSenders().forEach(sender => {
      if (sender.track) sender.track.enabled = !muted;
    });
  }

  /**
   * Internal setup: create offer, signal, and set remote answer.
   * @private
   */
  async startInternal(stream, sessionConfig, tokenEndpoint) {
    this.ms = stream;
    this.pc = new RTCPeerConnection();

    // Wire up events
    this.pc.ontrack = e => this.ontrack?.(e);
    this.pc.addTrack(stream.getTracks()[0]);
    this.pc.onconnectionstatechange = () => this.onconnectionstatechange?.(this.pc.connectionState);

    // DataChannel for events and transcripts
    this.dc = this.pc.createDataChannel('');
    this.dc.onopen    = () => this.onopen?.();
    this.dc.onmessage = e => {
      let data;
      try { data = JSON.parse(e.data); }
      catch { return; }
      this.onmessage?.(data);
    };

    // Create SDP offer
    const offer = await this.pc.createOffer();
    await this.pc.setLocalDescription(offer);

    // Exchange SDP via HTTP
    try {
      const answer = await this.signal(offer, sessionConfig, tokenEndpoint);
      await this.pc.setRemoteDescription(answer);
    } catch (err) {
      this.onerror?.(err);
    }
  }

  /**
   * Perform HTTP signaling:
   * 1) POST to /v1/realtime{tokenEndpoint} to get a client_secret
   * 2) POST raw SDP to /v1/realtime with that secret
   * @private
   */
  async signal(offer, sessionConfig, tokenEndpoint) {
    const urlRoot     = 'https://api.openai.com';
    const realtimeUrl = `${urlRoot}/v1/realtime`;
    let sdpResponse;

    if (this.useSessionToken) {
      // 1) fetch a short‐lived session token
      const sessionRes = await fetch(`${urlRoot}${tokenEndpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'openai-beta':   'realtime-v1',
          'Content-Type':  'application/json',
        },
        body: JSON.stringify(sessionConfig),
      });
      if (!sessionRes.ok) throw new Error('Failed to request session token');
      const { client_secret: { value: clientSecret } } = await sessionRes.json();

      // 2) send SDP offer with that token
      sdpResponse = await fetch(realtimeUrl, {
        method:  'POST',
        headers: {
          'Authorization': `Bearer ${clientSecret}`,
          'Content-Type':  'application/sdp',
        },
        body:    offer.sdp,
      });
      if (!sdpResponse.ok) throw new Error('Failed to signal');
    } else {
      // Fallback: send API key + form data
      const form = new FormData();
      form.append('session', JSON.stringify(sessionConfig));
      form.append('sdp', offer.sdp);

      sdpResponse = await fetch(realtimeUrl, {
        method:  'POST',
        headers: { 'Authorization': `Bearer ${this.apiKey}` },
        body:    form,
      });
      if (!sdpResponse.ok) throw new Error('Failed to signal');
    }

    return { type: 'answer', sdp: await sdpResponse.text() };
  }

  /**
   * Send an arbitrary control message over the DataChannel.
   * @param {object} message
   */
  sendMessage(message) {
    this.dc.send(JSON.stringify(message));
  }
}
