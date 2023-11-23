// src/functions/subdomain.js
export async function redirectF23(req, res) {
  if (req.headers.host === 'f23.socratica.info') {
    res.writeHead(302, {
      Location: 'https://socratica.notion.site/Socratica-Symposium-F23-7183a4f10f704de1858c7f3894b368e9?pvs=4',
    })
  } else {
    res.writeHead(404)
  }
  res.end()
}