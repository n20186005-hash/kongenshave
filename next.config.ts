import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
  // Required by @opennextjs/cloudflare: the adapter bundles the server from
  // the standalone output (.next/standalone/.next/server/...).
  output: 'standalone' as const,
  images: {
    remotePatterns: [
      { protocol: 'https' as const, hostname: 'images.unsplash.com' },
    ],
  },
};

export default withNextIntl(nextConfig);
