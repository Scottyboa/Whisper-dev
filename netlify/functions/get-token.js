// netlify/functions/get-token.js

export async function handler(event, context) {
  // 1. CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    };
  }

  // 2. Only POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Allow': 'POST, OPTIONS',
        'Access-Control-Allow-Origin': '*',
      },
      body: 'Method Not Allowed',
    };
  }

  // 3. Parse body
  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Invalid JSON' }),
    };
  }

  const userKey = payload.userKey;
  if (!userKey) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Missing userKey' }),
    };
  }

  // 4. Call OpenAI
  try {
    console.log('→ Calling OpenAI with key prefix:', userKey.slice(0,5) + '…');
    const openaiRes = await fetch(
      'https://api.openai.com/v1/audio/ephemeral_tokens',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model: 'gpt-4o-realtime-preview' }),
      }
    );

    // Read raw text
    const raw = await openaiRes.text();
    console.log('← OpenAI status:', openaiRes.status);
    console.log('← OpenAI raw body:', raw);

    let data;
    try {
      data = JSON.parse(raw);
    } catch (err) {
      console.error('JSON parse error:', err);
      // Return the raw HTML so you can inspect it in curl/browser
      return {
        statusCode: 502,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          error: 'OpenAI returned non-JSON; check logs for raw body'
        })
      };
    }

    return {
      statusCode: openaiRes.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data),
    };

  } catch (err) {
    console.error('Fetch to OpenAI failed:', err);
    return {
      statusCode: 502,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Failed to reach OpenAI: ' + err.message }),
    };
  }
}
