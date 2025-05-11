// netlify/functions/get-token.js

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
    // 3. Create a realtime transcription session
    const openaiRes = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type":  "application/json"
      },
      body: JSON.stringify({ model: "gpt-4o-mini-transcribe" })
    });

    const data = await openaiRes.json();
    if (!openaiRes.ok) {
      console.error("OpenAI error:", data);
      return {
        statusCode: openaiRes.status,
        headers:    { "Access-Control-Allow-Origin": "*" },
        body:       JSON.stringify({ error: data.error || data })
      };
    }

// 4. Extract flat strings, with fallback for session ID
const sessionId =
  data.session_id       // OpenAI may return this
  || data.id            // sometimes the field is called "id"
  || data.session?.id;  // or nested under "session"

const token = data.client_secret.value;

if (!sessionId || !token) {
  console.error("Invalid session response:", data);
  return {
    statusCode: 500,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ error: "Could not extract sessionId or token" })
  };
}


    // 5. Return them
    return {
      statusCode: 200,
      headers:    { "Access-Control-Allow-Origin": "*" },
      body:       JSON.stringify({ token, sessionId })
    };

  } catch (err) {
    console.error("Fetch to OpenAI failed:", err);
    return {
      statusCode: 502,
      headers:    { "Access-Control-Allow-Origin": "*" },
      body:       JSON.stringify({ error: "Failed to reach OpenAI: " + err.message })
    };
  }
};
