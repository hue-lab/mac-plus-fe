import { pageUrl } from '~/utils';

export function breadcrumbList(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      ...(path && { item: pageUrl(path) }),
    })),
  };
}

export function structuredData(...entries) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': entries.filter(Boolean),
  }).replace(/</g, '\\u003c');
}
