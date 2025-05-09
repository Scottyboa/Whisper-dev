// netlify/functions/get-token.js

exports.handler = async function(event) {
  console.log('🟢 get-token invoked, raw body:', event.body);

  // 1. Parse incoming JSON
  let userKey;
  try {
    ({ userKey } = JSON.parse(event.body || '{}'));
  } catch (err) {
    console.error('❌ JSON parse error:', err);
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Invalid JSON in request body' })
    };
  }

  // 2. Validate presence of API key
  if (!userKey || typeof userKey !== 'string') {
    console.error('❌ No or invalid userKey provided:', userKey);
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Missing or invalid userKey' })
    };
  }

  // 3. Relay request to OpenAI
  try {
    console.log('🔑 Calling OpenAI with key prefix:', userKey.slice(0, 5) + '…');
const openaiRes = await fetch(
  'https://api.openai.com/v1/audio/ephemeral-tokens?model=gpt-4o-realtime-preview',
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${userKey}`,
      'Content-Type': 'application/json'
    }
  }
);

    console.log('📥 OpenAI responded, status:', openaiRes.status);
    const data = await openaiRes.json();

    // 4. Return the token (or error) with CORS
    return {
      statusCode: openaiRes.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };

  } catch (err) {
    console.error('❌ Fetch to OpenAI failed:', err);
    return {
      statusCode: 502,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Failed to reach OpenAI: ' + err.message })
    };
  }
};
