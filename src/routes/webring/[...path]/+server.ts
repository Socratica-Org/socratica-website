import type { RequestHandler } from "./$types";

const ORIGIN = "https://webring.socratica-info.workers.dev";

export const fallback: RequestHandler = ({
  params,
  url,
  request,
  getClientAddress,
}) => {
  const target = `${ORIGIN}/webring/${params.path}${url.search}`;

  // Copy headers so we can augment them without mutating the incoming request.
  const headers = new Headers(request.headers);

  // Forward the real client IP. Cloudflare always sets `cf-connecting-ip` to
  // the IP that actually opened the TCP connection (Vercel's edge, in our
  // setup), and non-Enterprise plans can't override it. Set `x-forwarded-for`
  // and `true-client-ip` explicitly so the worker can read the real client IP
  // from those headers instead.
  const clientIp = getClientAddress();
  headers.set("x-forwarded-for", clientIp);
  headers.set("true-client-ip", clientIp);

  return fetch(target, {
    method: request.method,
    headers,
    body:
      request.method === "GET" || request.method === "HEAD"
        ? undefined
        : request.body,
    // Don't follow redirects inside the proxy — let 302s from the worker
    // propagate all the way back to the browser, which handles them natively.
    // Without this, `fetch()` silently follows the redirect and returns the
    // target site's body with a 200, breaking next/prev navigation.
    redirect: "manual",
    // Required by undici whenever a streaming body is passed; TypeScript's
    // lib.dom.d.ts doesn't declare it yet.
    // @ts-expect-error missing from TS lib
    duplex: "half",
  });
};
