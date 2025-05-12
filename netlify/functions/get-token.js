// netlify/functions/get-token.js

// No external dependencies—uses Node 18+ native fetch
exports.handler = async function(event) {
  // 1) Handle CORS preflight
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

  // 2) Parse incoming JSON for userKey
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

  // 3) Call the OpenAI realtime transcription_sessions endpoint
  try {
    const openaiRes = await fetch(
  'https://api.openai.com/v1/realtime/sessions',
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type':  'application/json',
      'openai-beta':   'realtime-v1'      // lowercase!
    },
    body: JSON.stringify({
      model: 'gpt-4o-transcribe'      // demo’s simple body
    })
  }
);

    // 4) Read & log the raw OpenAI response for debugging
    const data = await openaiRes.json();
    console.log('📡 OpenAI create-session response:', JSON.stringify(data));

    // 5) If OpenAI returned an error status, forward it
    if (!openaiRes.ok) {
      return {
        statusCode: openaiRes.status,
        headers:    { 'Access-Control-Allow-Origin': '*' },
        body:       JSON.stringify({ error: data.error || data })
      };
    }

    // 6) Pull out token & sessionId with multiple fallbacks
    //  - token might be in data.client_secret.value or data.client_secret (string)
    //  - sessionId might be in data.session_id or data.sessionId
    const token     =
      typeof data.client_secret === 'string'    ? data.client_secret :
      typeof data.client_secret?.value === 'string' ? data.client_secret.value :
      typeof data.token === 'string'            ? data.token :
      undefined;

    const sessionId =
      typeof data.session_id === 'string' ? data.session_id :
      typeof data.sessionId === 'string'   ? data.sessionId :
      undefined;

    if (!token || !sessionId) {
      console.error('⚠️ Missing token or sessionId in OpenAI response:', data);
      throw new Error('Missing token or sessionId');
    }

    // 7) Return exactly what the client needs
    return {
      statusCode: 200,
      headers: {
        'Content-Type':                'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ token, sessionId })
    };

  } catch (err) {
    console.error('❌ get-token handler error:', err);
    return {
      statusCode: 502,
      headers:    { 'Access-Control-Allow-Origin': '*' },
      body:       JSON.stringify({ error: err.message })
    };
  }
};
