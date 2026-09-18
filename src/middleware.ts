import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const SITE_HOST = 'www.kongenshave.com';

export default function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const host = nextUrl.host.toLowerCase();
  const proto =
    request.headers.get('x-forwarded-proto') ??
    (nextUrl.protocol === 'https:' ? 'https' : 'http');

  // Only enforce canonical host/HTTPS on the production domain so local dev
  // (localhost) is never redirected.
  const isProdHost = host === 'kongenshave.com' || host === 'www.kongenshave.com';
  if (isProdHost && (host !== SITE_HOST || proto === 'http')) {
    const url = nextUrl.clone();
    url.protocol = 'https';
    url.host = SITE_HOST;
    return NextResponse.redirect(url, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
