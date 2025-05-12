// netlify/functions/get-token.js

const fetch = require('node-fetch');

exports.handler = async function(event) {
  // 1. CORS preflight support
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: ''
    };
  }

  // 2. Parse incoming API key
  let userKey;
  try {
    ({ userKey } = JSON.parse(event.body || '{}'));
  } catch (err) {
    console.error('JSON parse error:', err);
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Invalid JSON in request body' })
    };
  }

  const apiKey = userKey || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('Missing API key');
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
        })
      }
    );

    const data = await openaiRes.json();

    // 4. Propagate any errors from OpenAI
    if (!openaiRes.ok) {
      console.error('OpenAI error:', openaiRes.status, data);
      return {
        statusCode: openaiRes.status,
        headers:    { 'Access-Control-Allow-Origin': '*' },
        body:       JSON.stringify({ error: data.error || data })
      };
    }

    // 5. Extract and return flat strings
    const sessionId = data.session_id;
    const token     = data.client_secret?.value;

    if (!sessionId || !token) {
      throw new Error('Unexpected response shape from OpenAI');
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type':                 'application/json',
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ token, sessionId })
    };

  } catch (err) {
    console.error('Fetch to OpenAI failed:', err);
    return {
      statusCode: 502,
      headers:    { 'Access-Control-Allow-Origin': '*' },
      body:       JSON.stringify({ error: 'Failed to reach OpenAI: ' + err.message })
    };
  }
};
