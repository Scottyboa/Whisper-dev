// netlify/functions/get-token.js

exports.handler = async function(event) {
  // 1) CORS preflight
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

  // 2) Parse the incoming userKey
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
  const apiKey = body.userKey || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Missing API key' })
    };
  }

  // 3) Create a realtime session (demo’s exact endpoint & header)
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
        body: JSON.stringify({ model: 'gpt-4o-mini-transcribe' })
      }
    );
    data = await res.json();
    console.log('📡 OpenAI create-session response:', JSON.stringify(data));
    if (!res.ok) {
      return {
        statusCode: res.status,
        headers:    { 'Access-Control-Allow-Origin': '*' },
        body:       JSON.stringify({ error: data.error || data })
      };
    }
  } catch (err) {
    console.error('Fetch to OpenAI failed:', err);
    return {
      statusCode: 502,
      headers:    { 'Access-Control-Allow-Origin': '*' },
      body:       JSON.stringify({ error: err.message })
    };
  }

  // 4) Extract token & sessionId with fallbacks
  const token =
    typeof data.token === 'string'                 ? data.token :
    typeof data.client_secret?.value === 'string'  ? data.client_secret.value :
    undefined;
  const sessionId =
    typeof data.sessionId === 'string' ? data.sessionId :
    typeof data.session_id === 'string' ? data.session_id :
    undefined;

  if (!token || !sessionId) {
    console.error('⚠️ Missing token/sessionId in response:', data);
    return {
      statusCode: 502,
      headers:    { 'Access-Control-Allow-Origin': '*' },
      body:       JSON.stringify({ error: 'Missing token or sessionId' })
    };
  }

  // 5) Return exactly what your client needs
  return {
    statusCode: 200,
    headers: {
      'Content-Type':                'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ token, sessionId })
  };
};
