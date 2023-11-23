export default async function handler(req, res) {
  const subdomain = 'f23'; // Replace 'subdomain' with your desired subdomain
  const externalLink = 'https://socratica.notion.site/Socratica-Symposium-F23-7183a4f10f704de1858c7f3894b368e9?pvs=4'; // Replace with the external link you want to redirect to

  if (req.headers.host === `${subdomain}.your-vercel-app-url.vercel.app`) {
    res.writeHead(302, { Location: externalLink });
    res.end();
  } else {
    res.status(404).send('Not Found');
  }
}