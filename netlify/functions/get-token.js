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

  // 3. Create a realtime transcription session
  try {
    console.log('Creating transcription session, key prefix:', userKey.slice(0,5) + '…');
    const openaiRes = await fetch(
      'https://api.openai.com/v1/realtime/transcription_sessions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          input_audio_transcription: {
            model: 'gpt-4o-transcribe',
            language: 'en'
          }
        })
      }
    );

    const data = await openaiRes.json();
    console.log('OpenAI response status:', openaiRes.status, 'payload:', data);

    // 4. Relay both token and session_id back to the client
    return {
      statusCode: openaiRes.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        client_secret: data.client_secret,
        session_id:   data.session_id
      })
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
