// netlify/functions/get-token.js
exports.handler = async function(event) {
  console.log('get-token invoked, body:', event.body);

  let userKey;
  try {
    ({ userKey } = JSON.parse(event.body || '{}'));
  } catch (err) {
    console.log('JSON parse error:', err);
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Invalid JSON' })
    };
  }

  if (!userKey) {
    console.log('No userKey provided');
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'No userKey provided' })
    };
  }

  try {
    console.log('Calling OpenAI with key:', userKey.slice(0, 5) + '…');
    const openaiRes = await fetch(
      'https://api.openai.com/v1/audio/ephemeral_tokens?model=gpt-4o-realtime-preview',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('OpenAI responded, status:', openaiRes.status);
    const data = await openaiRes.json();
    console.log('OpenAI payload:', data);
    return {
      statusCode: openaiRes.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.log('Fetch to OpenAI failed:', err);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message })
    };
  }
};
