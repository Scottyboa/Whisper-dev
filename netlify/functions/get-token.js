// netlify/functions/get-token.js

// Creates and returns an ephemeral token for real-time transcription via WebSocket
// Uses OpenAI's /v1/realtime/transcription_sessions endpoint with the assistants=v2 beta header

exports.handler = async function(event) {
  // CORS preflight
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

  // Parse body
  let params;
  try {
    params = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Invalid JSON in request' })
    };
  }

  const userKey = params.userKey;
  if (!userKey) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Missing userKey in request' })
    };
  }

  // Request a new transient session and token
  try {
    const resp = await fetch('https://api.openai.com/v1/realtime/transcription_sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${userKey}`,
        'Content-Type':  'application/json',
        'OpenAI-Beta':   'assistants=v2'
      },
      body: JSON.stringify({
        input_audio_format: 'pcm16',
        input_audio_transcription: {
          model:    'gpt-4o-mini-transcribe',
          language: 'en',
          prompt:   'Transcribe the incoming audio in real time.'
        },
        turn_detection: { type: 'server_vad', silence_duration_ms: 300 }
      })
    });

    const data = await resp.json();
    if (!resp.ok) {
      return {
        statusCode: resp.status,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'OpenAI error', data })
      };
    }

    // Extract ephemeral token
    const token = data.client_secret?.value;
    if (!token) {
      return {
        statusCode: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Missing ephemeral token', data })
      };
    }

    // Success
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ token })
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Internal error', message: err.message })
    };
  }
};
