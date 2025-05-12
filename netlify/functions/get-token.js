// netlify/functions/get-token.js

// Creates a realtime session and returns { token, sessionId, iceServers }.
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

  // Determine API key
  const apiKey = body.userKey || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Missing API key' })
    };
  }

  // Create the realtime session
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
        body: JSON.stringify({ model: 'gpt-4o-realtime-preview-2024-12-17' })
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

  // Extract token and sessionId
  const token =
    typeof data.token === 'string' ? data.token :
    typeof data.client_secret?.value === 'string' ? data.client_secret.value :
    undefined;

  const sessionId =
    typeof data.sessionId === 'string'    ? data.sessionId :     // camelCase
    typeof data.session_id === 'string'   ? data.session_id :    // snake_case
    typeof data.id === 'string'           ? data.id :            // fallback from endpoint
    undefined;

  // Extract ICE servers array (could be under iceServers or ice_servers)
  const iceServers = Array.isArray(data.iceServers)
    ? data.iceServers
    : Array.isArray(data.ice_servers)
      ? data.ice_servers
      : [];

  // If we didn’t get valid token/sessionId, return raw payload for debugging
  if (!token || !sessionId) {
    return {
      statusCode: 200,
      headers:    { 'Access-Control-Allow-Origin': '*' },
      body:       JSON.stringify({ error: 'Missing token or sessionId', data })
    };
  }

  // All good — return token, sessionId, and ICE servers
  return {
    statusCode: 200,
    headers:    { 'Access-Control-Allow-Origin': '*' },
    body:       JSON.stringify({ token, sessionId, iceServers })
  };
};
