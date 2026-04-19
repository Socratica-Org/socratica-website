import type { APIRoute } from "astro";
import locationsData from "@/data/locations.json";

export const prerender = true;

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(locationsData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
