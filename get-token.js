// netlify/functions/get-token.js
import fetch from 'node-fetch';

exports.handler = async (event) => {
  try {
    const { userKey } = JSON.parse(event.body);
    const resp = await fetch(
      'https://api.openai.com/v1/audio/ephemeral_tokens?model=gpt-4o-realtime-preview',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    const payload = await resp.json();
    return {
      statusCode: resp.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message })
    };
  }
};
