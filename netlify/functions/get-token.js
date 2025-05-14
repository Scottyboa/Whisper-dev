// netlify/functions/get-token.js

// Creates a realtime transcription session and returns { token, sessionId }.
// If fields are missing, returns the raw OpenAI payload for debugging.
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

  // Parse incoming body
  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Invalid JSON' })
    };
  }

  // Determine API key
  const apiKey = body.userKey || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Missing API key' })
    };
  }

  let data;
  try {
    // ← UPDATED: use the transcription_sessions endpoint and pass model in input_audio_transcription
    const res = await fetch(
      'https://api.openai.com/v1/realtime/transcription_sessions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type':  'application/json',
          'openai-beta':   'realtime-v1'
        },
        body: JSON.stringify({
          input_audio_transcription: {
            model: 'gpt-4o-transcribe'
          }
        })
      }
    );

    data = await res.json();
    console.log('📡 OpenAI response:', data);

    if (!res.ok) {
      return {
        statusCode: res.status,
        headers:    { 'Access-Control-Allow-Origin': '*' },
        body:       JSON.stringify({ error: data.error || data, data })
      };
    }
  } catch (err) {
    return {
      statusCode: 502,
      headers:    { 'Access-Control-Allow-Origin': '*' },
      body:       JSON.stringify({ error: err.message })
    };
  }

  // Extract token and sessionId from response
  const token =
    typeof data.token === 'string' ? data.token :
    typeof data.client_secret?.value === 'string' ? data.client_secret.value :
    undefined;

  const sessionId =
    typeof data.sessionId === 'string' ? data.sessionId :
    typeof data.session_id === 'string'  ? data.session_id :
    typeof data.id === 'string'          ? data.id :
    undefined;

  // If we couldn’t find token or sessionId, return raw payload for debugging
  if (!token || !sessionId) {
    return {
      statusCode: 200,
      headers:    { 'Access-Control-Allow-Origin': '*' },
      body:       JSON.stringify({ error: 'Missing token or sessionId', data })
    };
  }

  // Return the ephemeral token and session ID
  return {
    statusCode: 200,
    headers:    { 'Access-Control-Allow-Origin': '*' },
    body:       JSON.stringify({ token, sessionId })
  };
};
