export async function handler(event) {
  const upstreamBase = "https://stt-rt.eu.soniox.com";

  // Local probe that doesn't hit Soniox (to verify routing without external deps)
  if (event.path.endsWith("/__probe")) {
    return { statusCode: 200, headers: jsonCors(event.headers), body: JSON.stringify({ ok: true, fn: "attached" }) };
  }

  // Build upstream target URL for Soniox EU
  // With the :splat redirect, event.path looks like:
  //   "/.netlify/functions/soniox-eu/v1/files"
  // so we remove only the function prefix and keep "/v1/files"
  const functionPrefix = "/.netlify/functions/soniox-eu";
  const pathOnly = event.path.startsWith(functionPrefix)
    ? event.path.slice(functionPrefix.length)
    : event.path;
  const search = event.rawQuery ? `?${event.rawQuery}` : "";
  const target = new URL(`${pathOnly || "/"}` + search, upstreamBase);

  // CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: cors(event.headers), body: "" };
  }

  // Pass through headers (keep Authorization), drop browser-only
  const inHeaders = event.headers || {};
  const headers = new Headers(inHeaders);
  headers.delete("origin");
  headers.delete("referer");

  // Body passthrough (support base64 for binary/form-data)
  const bodyBuf = ["GET", "HEAD"].includes(event.httpMethod)
    ? undefined
    : (event.isBase64Encoded ? Buffer.from(event.body || "", "base64") : event.body);

  const resp = await fetch(target.toString(), {
    method: event.httpMethod,
    headers,
    body: bodyBuf,
    redirect: "manual",
  });

  const buf = await resp.arrayBuffer();
  const outHeaders = Object.fromEntries(resp.headers.entries());
  Object.assign(outHeaders, cors(inHeaders)); // add CORS for browser

  return {
    statusCode: resp.status,
    headers: outHeaders,
    body: Buffer.from(buf).toString("base64"),
    isBase64Encoded: true,
  };
}

function cors(inHeaders) {
  const origin = inHeaders?.origin || "*";
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-credentials": "true",
    "access-control-allow-methods": "GET,POST,PUT,DELETE,OPTIONS",
    "access-control-allow-headers": "authorization,content-type",
    "vary": "origin",
  };
}
function jsonCors(inHeaders) {
  return { ...cors(inHeaders), "content-type": "application/json" };
}
