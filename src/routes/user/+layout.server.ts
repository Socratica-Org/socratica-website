import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { Config } from '@sveltejs/adapter-vercel';

export const config: Config = {
  runtime: 'edge',
};

export const load: LayoutServerLoad = async ({ request }) => {
  const { host } = request.headers;
  const subdomain = host.split('.')[0]; // Extract the subdomain from the host

  if (subdomain === 'f23') {
    // Redirect to the external Notion link
    throw redirect(307, 'https://socratica.notion.site/Socratica-Symposium-F23-7183a4f10f704de1858c7f3894b368e9?pvs=4');
  }
};
