// netlify/functions/get-token.js

const fetch = require("node-fetch"); // If your runtime already has global fetch, you can omit this line

exports.handler = async function(event) {
  console.log("get-token invoked, body:", event.body);

  // 1. Parse incoming JSON
  let userKey;
  try {
    ({ userKey } = JSON.parse(event.body || "{}"));
  } catch (err) {
    console.error("JSON parse error:", err);
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Invalid JSON in request body" })
    };
  }

  // 2. Determine which API key to use
  const apiKey = userKey || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Missing OpenAI API key" })
    };
  }

  try {
    // 3. Create a Realtime transcription session
    //    See: curl -X POST https://api.openai.com/v1/realtime/sessions … :contentReference[oaicite:0]{index=0}
    const openaiRes = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        // If you’re in beta and need it, you may also need:
        // "OpenAI-Beta": "assistants=v2"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini-transcribe" // or whichever realtime‐transcription model you prefer
      })
    });

    const data = await openaiRes.json();
    if (!openaiRes.ok) {
      console.error("OpenAI error:", data);
      return {
        statusCode: openaiRes.status,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: data.error || data })
      };
    }

    // 4. Extract the raw token string from the nested client_secret object
    //    The API returns { client_secret: { value: "...", expires_at: ... }, session_id: "..." } :contentReference[oaicite:1]{index=1}
    const sessionId = data.session_id;
    const token     = data.client_secret.value;

    // 5. Return flat strings for easy client consumption
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ token, sessionId })
    };

  } catch (err) {
    console.error("Fetch to OpenAI failed:", err);
    return {
      statusCode: 502,
      headers:   { "Access-Control-Allow-Origin": "*" },
      body:      JSON.stringify({ error: "Failed to reach OpenAI: " + err.message })
    };
  }
};
