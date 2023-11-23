import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const subdomain = 'f23'; // Replace with your subdomain
  const notionLink = 'https://socratica.notion.site/Socratica-Symposium-F23-7183a4f10f704de1858c7f3894b368e9?pvs=4'; // Replace with your Notion link
  const redirectURL = `https://${subdomain}.socratica.info`;

  res.writeHead(302, { Location: redirectURL });
  res.end();
}