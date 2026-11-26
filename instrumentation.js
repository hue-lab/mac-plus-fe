export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.NEXT_PHASE !== 'phase-production-build') {
    const { startSitemapRefresh } = await import('./utils/sitemap-cache');
    startSitemapRefresh();
  }
}
