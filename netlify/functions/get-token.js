// netlify/functions/get-token.js

// (Netlify runs on Node 18+, so global fetch is available)

export async function handler(event, context) {
  // 1. Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: ''
    };
  }

  // 2. Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Allow': 'POST, OPTIONS',
        'Access-Control-Allow-Origin': '*'
      },
      body: 'Method Not Allowed'
    };
  }

  // 3. Parse & validate JSON body
  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch (err) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Invalid JSON in request body' })
    };
  }

  const userKey = payload.userKey;
  if (!userKey) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Missing userKey' })
    };
  }

  // 4. Forward request to OpenAI
  try {
    console.log(
      '→ Calling OpenAI ephemeral_tokens with key prefix:',
      userKey.slice(0,5) + '…'
    );

    const openaiRes = await fetch(
      'https://api.openai.com/v1/audio/ephemeral_tokens',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ model: 'gpt-4o-realtime-preview' })
      }
    );

    const data = await openaiRes.json();
    console.log('← OpenAI responded', openaiRes.status, data);

    return {
      statusCode: openaiRes.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.error('✖ Error reaching OpenAI:', err);
    return {
      statusCode: 502,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Failed to reach OpenAI: ' + err.message
      })
    };
  }
}
