// netlify/functions/get-token.js

// Creates a real-time transcription session and returns { token, sessionId }.
// Uses OpenAI's v1/realtime/transcription_sessions endpoint with the beta header "assistants=v2".

exports.handler = async function(event) {
  // Handle CORS preflight
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

  // Parse request body
  let params;
  try {
    params = JSON.parse(event.body || '{}');
  } catch (e) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Invalid JSON in request body' })
    };
  }

  const userKey = params.userKey;
  if (!userKey) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Missing userKey in request body' })
    };
  }

  // Call OpenAI to create a transcription session
  const response = await fetch('https://api.openai.com/v1/realtime/transcription_sessions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${userKey}`,
      'Content-Type':  'application/json',
      'OpenAI-Beta':   'assistants=v2'
    },
    body: JSON.stringify({
      input_audio_format: 'pcm16',
      input_audio_transcription: {
        model: 'gpt-4o-mini-transcribe',
        language: 'en',
        prompt: 'Transcribe the incoming audio in real time.'
      },
      turn_detection: { type: 'server_vad', silence_duration_ms: 300 }
    })
  });

  const data = await response.json();

  // Propagate any error from OpenAI
  if (!response.ok) {
    return {
      statusCode: response.status,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'OpenAI API error', data })
    };
  }

  // Extract ephemeral token and the session ID
  const token     = data.client_secret?.value;
  const sessionId = data.session?.id;

  if (!token || !sessionId) {
    // Return raw payload for debugging if missing
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Missing token or sessionId', data })
    };
  }

  // Success: return token & sessionId
  return {
    statusCode: 200,
    headers:    { 'Access-Control-Allow-Origin': '*' },
    body:       JSON.stringify({ token, sessionId })
  };
};
