// netlify/functions/get-token.js
const fetch = require('node-fetch');

exports.handler = async function(event) {
  // 1) CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: ''
    };
  }

  // 2) Parse incoming API key
  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (e) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Invalid JSON' })
    };
  }
  const apiKey = body.userKey || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Missing API key' })
    };
  }

  // 3) Create transcription session
  try {
    const res = await fetch(
      'https://api.openai.com/v1/realtime/transcription_sessions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type':  'application/json',
          'OpenAI-Beta':   'realtime=v1'
        },
        body: JSON.stringify({
          input_audio_transcription: { model: 'gpt-4o-transcribe', language: 'en' }
        })
      }
    );

    const data = await res.json();
    if (!res.ok) {
      console.error('OpenAI error:', data);
      return {
        statusCode: res.status,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: data })
      };
    }

    // 4) Pull out flat strings
    const token     = data.client_secret?.value;
    const sessionId = data.session_id;
    if (!token || !sessionId) {
      throw new Error('Missing token or sessionId in OpenAI response');
    }

    // 5) Return exactly what the client wants
    return {
      statusCode: 200,
      headers: {
        'Content-Type':                'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ token, sessionId })
    };

  } catch (err) {
    console.error('Handler error:', err);
    return {
      statusCode: 502,
      headers:    { 'Access-Control-Allow-Origin': '*' },
      body:       JSON.stringify({ error: err.message })
    };
  }
};
