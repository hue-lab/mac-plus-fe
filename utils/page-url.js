export const SITE_HOST = (process.env.NEXT_PUBLIC_HOST || 'https://macplus.by').replace(/\/+$/, '');

const trimSlashes = (value) => String(value ?? '').trim().replace(/^\/+|\/+$/g, '');

export const pagePath = (...segments) => {
  const path = segments.map(trimSlashes).filter(Boolean).join('/');
  return path ? `/${path}/` : '/';
};

export const pageUrl = (...segments) => `${SITE_HOST}${pagePath(...segments)}`;
