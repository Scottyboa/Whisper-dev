// netlify/functions/get-token.js

exports.handler = async (event) => {
  // Parse userKey from the request
  let userKey;
  try {
    ({ userKey } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  // Create a realtime transcription session on OpenAI
  const res = await fetch('https://api.openai.com/v1/realtime/transcription_sessions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${userKey}`,
      'Content-Type':  'application/json'
    },
    body: JSON.stringify({ input_audio_transcription: { model: 'gpt-4o-transcribe', language: 'en' } })
  });
  const data = await res.json();

  // Relay back as flat strings
  return {
    statusCode: res.status,
    headers: {
      'Content-Type':                'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      token:     data.client_secret,
      sessionId: data.session_id
    })
  };
};
