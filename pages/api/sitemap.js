import { readSitemap } from '~/utils/sitemap-cache';

export default async function sitemapHandler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).end();
  }
  const sitemap = await readSitemap();
  if (!sitemap) {
    res.setHeader('Retry-After', '60');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(503).end();
  }

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=900');
  res.status(200).send(sitemap);
}
