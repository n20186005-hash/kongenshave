import type { MetadataRoute } from 'next';

const baseUrl = 'https://www.kongenshave.com';
const now = new Date();

const locales = ['en', 'zh', 'de', 'da'] as const;
const paths = [
  '/',
  '/privacy-policy',
  '/terms-of-service',
  '/cookie-settings',
  '/picnic-spots',
  '/things-to-do',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const prefix = locale === 'en' ? '' : `/${locale}`;
    for (const p of paths) {
      const priority = p === '/' ? 1 : p.startsWith('/picnic') || p.startsWith('/things') ? 0.7 : 0.3;
      entries.push({
        url: `${baseUrl}${prefix}${p}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority,
      });
    }
  }

  return entries;
}
