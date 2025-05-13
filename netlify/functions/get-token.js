// netlify/functions/get-token.js

// Creates a realtime transcription session and returns { token, sessionId }.
// Expects the client to POST a JSON body containing:
//   - userKey (optional): an OpenAI API key to use instead of the default.
//   - input_audio_transcription: { model: "gpt-4o-transcribe", prompt?: string }
//   - turn_detection: { type: "vad" | "legacy" | "none" }
// Any other fields in the JSON body will be forwarded as part of the sessionConfig.

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

  // Parse JSON body
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

  // Extract everything except userKey as the sessionConfig
  const { userKey, ...sessionConfig } = body;

  // Call the new transcription_sessions endpoint
  let data;
  try {
    const res = await fetch(
      'https://api.openai.com/v1/realtime/transcription_sessions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type':  'application/json',
          'openai-beta':   'realtime-v1'
        },
        body: JSON.stringify(sessionConfig)
      }
    );
    data = await res.json();
    console.log('📡 OpenAI response:', data);

    if (!res.ok) {
      return {
        statusCode: res.status,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: data.error || data, data })
      };
    }
  } catch (err) {
    return {
      statusCode: 502,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message })
    };
  }

  // Extract the client_secret token and session ID
  const token     = data.client_secret?.value;
  const sessionId = data.id;

  if (!token || !sessionId) {
    // If something unexpected happened, return the raw payload for debugging
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Missing token or sessionId', data })
    };
  }

  // Success
  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ token, sessionId })
  };
};
