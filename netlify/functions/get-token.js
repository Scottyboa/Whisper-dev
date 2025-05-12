// netlify/functions/get-token.js

const fetch = require('node-fetch');

exports.handler = async function(event) {
  // 1. CORS preflight support
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

  // 2. Parse incoming JSON for userKey
  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (err) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Invalid JSON in request body' })
    };
  }
  const apiKey = body.userKey || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Missing OpenAI API key' })
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
          'openai-beta':     'realtime-v1',
        },
        body: JSON.stringify({
          input_audio_transcription: {
            model:    'gpt-4o-transcribe',
            language: 'en'
          }
        }),
      }
    );

    const data = await openaiRes.json();
    if (!openaiRes.ok) {
      return {
        statusCode: openaiRes.status,
        headers:    { 'Access-Control-Allow-Origin': '*' },
        body:       JSON.stringify({ error: data.error || data })
      };
    }

    // 4. Extract flat strings
    const token     = data.client_secret?.value;
    const sessionId = data.session_id;
    if (!token || !sessionId) {
      throw new Error('Unexpected response shape from OpenAI');
    }

    // 5. Return exactly what your client expects
    return {
      statusCode: 200,
      headers: {
        'Content-Type':                'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ token, sessionId })
    };
  } catch (err) {
    console.error('get-token error:', err);
    return {
      statusCode: 502,
      headers:    { 'Access-Control-Allow-Origin': '*' },
      body:       JSON.stringify({ error: err.message })
    };
  }
};
