import { parse } from 'parse5';

const sitemapUrl = new URL('/sitemap.xml', process.argv[2] || 'https://macplus.by');
const fetchPage = (url) => fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(15_000) });
const response = await fetchPage(sitemapUrl);
if (response.status !== 200) throw new Error(`Sitemap has HTTP status ${response.status}`);

const xml = await response.text();
const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => new URL(match[1].replace(/&(amp|lt|gt|quot|apos);/g, (_, name) => entities[name])));
if (!urls.length || new Set(urls.map(String)).size !== urls.length) {
  throw new Error('Sitemap is empty or contains duplicate URLs');
}
for (const url of urls) {
  const path = decodeURI(url.pathname);
  if (url.origin !== sitemapUrl.origin || url.search || url.hash ||
    path !== path.toLowerCase() || /\/(?:filter|page-is-[^/]+)(?:\/|$)/.test(path)) {
    throw new Error(`Unexpected sitemap URL: ${url}`);
  }
}

const count = Math.min(100, urls.length);
const sample = Array.from({ length: count }, (_, index) => urls[Math.floor(index * urls.length / count)]);

async function check(url) {
  const page = await fetchPage(url);
  if (page.status !== 200) {
    await page.body?.cancel();
    throw new Error(`HTTP ${page.status}`);
  }
  const document = parse(await page.text());
  const head = document.childNodes.find((node) => node.nodeName === 'html')
    ?.childNodes.find((node) => node.nodeName === 'head');
  const getAttr = (element, name) => element.attrs?.find((attr) => attr.name === name)?.value;
  const canonicals = head?.childNodes.filter((node) => node.nodeName === 'link' && getAttr(node, 'rel') === 'canonical') || [];
  if (canonicals.length !== 1 || new URL(getAttr(canonicals[0], 'href')).href !== url.href) {
    throw new Error('Missing, duplicate or different canonical URL');
  }
  const robots = head.childNodes.filter((node) => node.nodeName === 'meta' &&
    /^(robots|googlebot)$/i.test(getAttr(node, 'name') || ''))
    .map((node) => getAttr(node, 'content'));
  if ([...robots, page.headers.get('x-robots-tag')].some((value) => /\b(?:noindex|none)\b/i.test(value || ''))) {
    throw new Error('Page is marked noindex');
  }
}

const errors = [];
for (let index = 0; index < sample.length; index += 2) {
  await Promise.all(sample.slice(index, index + 2).map(async (url) => {
    try {
      await check(url);
    } catch (error) {
      errors.push(`${url} ${error.message}`);
    }
  }));
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Verified ${count} of ${urls.length} URLs from ${sitemapUrl}`);
}
