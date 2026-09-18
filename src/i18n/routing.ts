import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'zh', 'de', 'da'],
  defaultLocale: 'en',
  localePrefix: {
    mode: 'as-needed',
  },
  pathnames: {
    '/': '/',
    '/privacy-policy': '/privacy-policy',
    '/terms-of-service': '/terms-of-service',
    '/cookie-settings': '/cookie-settings',
    '/picnic-spots': '/picnic-spots',
    '/things-to-do': '/things-to-do',
  },
});

export type Locale = (typeof routing.locales)[number];
