// netlify/functions/get-token.js

// Creates a realtime transcription session and returns { token, sessionId }.
// Accepts: { userKey, model? }
// Returns: { token, sessionId }
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

  // Determine API key and model
  const apiKey = body.userKey || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Missing API key' })
    };
  }
  const model = body.model || 'gpt-4o-transcribe';

  // Create realtime session
  let data;
  try {
    const res = await fetch(
      'https://api.openai.com/v1/realtime/sessions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type':  'application/json',
          'openai-beta':   'realtime-v1'
        },
        body: JSON.stringify({ model })
      }
    );
    data = await res.json();
    console.log('📡 OpenAI response:', data);
    if (!res.ok) {
      throw new Error(data.error?.message || `HTTP ${res.status}`);
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message })
    };
  }

  // Extract token and sessionId
  const token =
    typeof data.client_secret?.value === 'string' ? data.client_secret.value :
    typeof data.token === 'string' ? data.token :
    undefined;
  const sessionId =
    typeof data.id === 'string' ? data.id :
    typeof data.session_id === 'string' ? data.session_id :
    typeof data.sessionId === 'string' ? data.sessionId :
    undefined;

  if (!token || !sessionId) {
    // Return raw payload for debugging
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
