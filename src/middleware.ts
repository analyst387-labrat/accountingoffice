import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. If we are at the root '/', apply geo-logic
  if (pathname === '/') {
    const country = request.headers.get('x-vercel-ip-country') || 'US';

    // DACH Region → German
    if (['DE', 'AT', 'CH'].includes(country)) {
      return Response.redirect(new URL('/de', request.url));
    }
    // Balkans → Bosnian
    if (['BA', 'RS', 'HR', 'ME'].includes(country)) {
      return Response.redirect(new URL('/bs', request.url));
    }
    // Default → English
    return Response.redirect(new URL('/en', request.url));
  }

  // 2. Otherwise, let next-intl handle standard locale routing
  return handleI18nRouting(request);
}

export const config = {
  // Match root (for geo-redirect) and all locale-prefixed routes
  matcher: ['/', '/(de|en|bs)/:path*'],
};
