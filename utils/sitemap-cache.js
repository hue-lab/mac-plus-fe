import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { getArticles } from '~/utils/endpoints/articles';
import { fetchJson } from '~/utils/endpoints/fetch-json';
import { pageUrl } from '~/utils/page-url';

const refreshInterval = 15 * 60 * 1000;
const snapshotPath = process.env.SITEMAP_CACHE_FILE || join(tmpdir(), 'macplus-sitemap.xml');
const xmlEscapes = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' };

export async function readSitemap() {
  try {
    return await readFile(snapshotPath, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    return null;
  }
}

async function blogPaths() {
  const paths = [];
  const limit = 100;
  for (let page = 1; ; page++) {
    const { data, metadata } = await getArticles(page, limit, true);
    if (!Array.isArray(data)) throw new Error('Unexpected article listing');
    for (const post of data) {
      if (post.seo?.seoUrl && !post.hidden) paths.push(`blog/${post.seo.seoUrl}`);
    }
    if (page >= (metadata?.lastPage || 1)) return paths;
  }
}

export async function refreshSitemap() {
  const [catalogue, blog] = await Promise.all([
    fetchJson(`${process.env.API_HOST}/store/catalogue/seo-paths`),
    blogPaths(),
  ]);
  if (!Array.isArray(catalogue)) throw new Error('Unexpected catalogue SEO paths');
  const paths = ['', 'shop', 'blog', 'pages/contact-us', 'pages/trade-in', ...catalogue, ...blog];
  const urls = [...new Set(paths
    .filter((path) => path === path.toLowerCase() &&
      !/(?:^|\/)(?:filter|page-is-[^/]+)(?:\/|$)|[?#]/.test(path))
    .map((path) => encodeURI(pageUrl(path)).replace(/[&<>"']/g, (character) => xmlEscapes[character])))];
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n') + '\n</urlset>\n';

  await mkdir(dirname(snapshotPath), { recursive: true });
  const temporaryPath = `${snapshotPath}.${randomUUID()}.tmp`;
  try {
    await writeFile(temporaryPath, xml, { flag: 'wx' });
    await rename(temporaryPath, snapshotPath);
  } finally {
    await rm(temporaryPath, { force: true });
  }
}

export function startSitemapRefresh() {
  const workerKey = Symbol.for('macplus.sitemap-refresh');
  if (globalThis[workerKey]) return;
  globalThis[workerKey] = true;

  async function run() {
    let delay = refreshInterval;
    try {
      await refreshSitemap();
    } catch (error) {
      console.error('[sitemap] Snapshot refresh failed', error.message);
      delay = 60_000;
    }
    setTimeout(run, delay).unref();
  }

  void run();
}
