import type { RequestHandler } from "./$types";

const ORIGIN = "https://webring.socratica-info.workers.dev";

export const fallback: RequestHandler = ({ params, url, request }) => {
  const target = `${ORIGIN}/webring/${params.path}${url.search}`;
  const proxied = new Request(target, request);
  return fetch(proxied);
};
