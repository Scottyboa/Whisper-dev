// netlify/functions/get-token.js

const fetch = require('node-fetch');

exports.handler = async function(event) {
  try {
    // Parse the incoming body for the user’s API key
    const { userKey: apiKey } = JSON.parse(event.body || '{}');
    if (!apiKey) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing userKey in request body' }),
      };
    }

    // Create a realtime transcription session
    const openaiRes = await fetch(
      'https://api.openai.com/v1/realtime/transcription_sessions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type':  'application/json',
        },
        body: JSON.stringify({
          // adjust model or language as needed
          input_audio_transcription: { model: 'gpt-4o-transcribe', language: 'en' }
        }),
      }
    );

    const data = await openaiRes.json();
    if (!openaiRes.ok) {
      // Propagate error from OpenAI
      return {
        statusCode: openaiRes.status,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: data }),
      };
    }

    // Extract the ephemeral token and session ID
    const token     = data.client_secret?.value;
    const sessionId = data.session_id;

    if (!token || !sessionId) {
      throw new Error('Unexpected response shape from OpenAI');
    }

    // Return exactly what recording.js expects
    return {
      statusCode: 200,
      headers: {
        'Content-Type':                 'application/json',
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ token, sessionId }),
    };
  } catch (err) {
    console.error('get-token error', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
