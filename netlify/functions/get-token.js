// netlify/functions/get-token.js

exports.handler = async function(event) {
  console.log('get-token invoked, body:', event.body);

  // 1. Parse incoming JSON
  let userKey;
  try {
    ({ userKey } = JSON.parse(event.body || '{}'));
  } catch (err) {
    console.error('JSON parse error:', err);
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Invalid JSON in request body' })
    };
  }

  // 2. Validate API key
  if (!userKey || typeof userKey !== 'string') {
    console.error('No or invalid userKey provided:', userKey);
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Missing or invalid userKey' })
    };
  }

  // 3. Relay request to OpenAI
  try {
    console.log('Calling OpenAI endpoint with token prefix:', userKey.slice(0,5) + '…');
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
    console.log('OpenAI response status:', openaiRes.status, 'payload:', data);

    return {
      statusCode: openaiRes.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.error('Fetch to OpenAI failed:', err);
    return {
      statusCode: 502,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Failed to reach OpenAI: ' + err.message })
    };
  }
};
