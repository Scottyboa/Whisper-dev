// netlify/functions/get-token.js

const fetch = require('node-fetch');

exports.handler = async function(event) {
  // 1. Handle CORS preflight so your browser can POST
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

  // 2. Parse the incoming JSON for userKey
  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (err) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Invalid JSON in request' }),
    };
  }

  const apiKey = payload.userKey || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Missing OpenAI API key' }),
    };
  }

  // 3. Create a realtime transcription session
  try {
    const openaiRes = await fetch(
      'https://api.openai.com/v1/realtime/transcription_sessions',
      {
        method: 'POST',
        headers: {
          'Authorization':   `Bearer ${apiKey}`,
          'Content-Type':    'application/json',
          'OpenAI-Beta':     'realtime=v1',
        },
        body: JSON.stringify({
          input_audio_transcription: { model: 'gpt-4o-transcribe', language: 'en' }
        }),
      }
    );

    const data = await openaiRes.json();
    if (!openaiRes.ok) {
      // log the full response for debugging
      console.error('OpenAI 401 details:', data);
      return {
        statusCode: openaiRes.status,
        headers:    { 'Access-Control-Allow-Origin': '*' },
        body:       JSON.stringify({ error: data }),
      };
    }

    // 4. Pull out the flat strings
    const token     = data.client_secret?.value;
    const sessionId = data.session_id;
    if (!token || !sessionId) {
      throw new Error('Unexpected response shape from OpenAI');
    }

    // 5. Return exactly what recording.js expects
    return {
      statusCode: 200,
      headers: {
        'Content-Type':                'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ token, sessionId }),
    };

  } catch (err) {
    console.error('get-token failed:', err);
    return {
      statusCode: 502,
      headers:    { 'Access-Control-Allow-Origin': '*' },
      body:       JSON.stringify({ error: err.message }),
    };
  }
};
