// netlify/functions/get-token.js

// Creates a realtime session and returns { token, sessionId }.
// If fields are missing, returns the raw OpenAI payload for debugging.
exports.handler = async function(event) {
  // 1) CORS preflight support
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      body: ''
    };
  }

  // 2) Parse incoming JSON
  let body = {};
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Invalid JSON' })
    };
  }

  // 3) Determine API key to use
  const apiKey = body.userKey || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Missing API key' })
    };
  }

  // 4) Call OpenAI to create a realtime session
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
        body: JSON.stringify({
          model: 'gpt-4o-realtime-preview-2024-12-17'
        })
      }
    );
    data = await res.json();
    console.log('📡 OpenAI /sessions response:', data);

    if (!res.ok) {
      return {
        statusCode: res.status,
        headers:    { 'Access-Control-Allow-Origin': '*' },
        body:       JSON.stringify({ error: data.error || data })
      };
    }
  } catch (err) {
    return {
      statusCode: 502,
      headers:    { 'Access-Control-Allow-Origin': '*' },
      body:       JSON.stringify({ error: err.message })
    };
  }

  // 5) Extract token + sessionId with fallbacks
  const token =
    typeof data.token === 'string' ? data.token :
    typeof data.client_secret?.value === 'string' ? data.client_secret.value :
    undefined;

  const sessionId =
    typeof data.sessionId === 'string' ? data.sessionId :
    typeof data.session_id === 'string' ? data.session_id :
    typeof data.id === 'string'          ? data.id :
    undefined;

  if (!token || !sessionId) {
    // Let the client inspect the full payload if something’s off
    return {
      statusCode: 200,
      headers:    { 'Access-Control-Allow-Origin': '*' },
      body:       JSON.stringify({ error: 'Missing token or sessionId', data })
    };
  }

  // 6) Return the minimal { token, sessionId }
  return {
    statusCode: 200,
    headers:    { 'Access-Control-Allow-Origin': '*' },
    body:       JSON.stringify({ token, sessionId })
  };
};
