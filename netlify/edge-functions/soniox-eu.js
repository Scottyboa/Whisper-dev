export default async (request, context) => {
  const inUrl = new URL(request.url);
  const target = new URL(
    inUrl.pathname.replace(/^\/api\/soniox-eu/, "") + inUrl.search,
    "https://stt-rt.eu.soniox.com"
  );

  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(request) });
  }

  // Forward request
  const headers = new Headers(request.headers);
  headers.delete("origin");
  headers.delete("referer");

  const resp = await fetch(target.toString(), {
    method: request.method,
    headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
  });

  // Add CORS headers to response
  const outHeaders = new Headers(resp.headers);
  corsHeaders(request).forEach((v, k) => outHeaders.set(k, v));

  return new Response(resp.body, {
    status: resp.status,
    statusText: resp.statusText,
    headers: outHeaders,
  });
};

function corsHeaders(request) {
  const origin = request.headers.get("origin") || "*";
  return new Headers({
    "access-control-allow-origin": origin,
    "access-control-allow-credentials": "true",
    "access-control-allow-methods": "GET,POST,PUT,DELETE,OPTIONS",
    "access-control-allow-headers": "authorization,content-type",
    "vary": "origin",
  });
}
