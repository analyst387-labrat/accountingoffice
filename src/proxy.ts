import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

// Country-to-locale mapping for geolocation redirect
const DACH_COUNTRIES = new Set(['DE', 'AT', 'CH']);
const BALKAN_COUNTRIES = new Set(['BA', 'RS', 'HR', 'ME', 'MK', 'SI', 'AL', 'XK']);

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply geo-redirect on the root path (no locale prefix yet)
  const isRootPath = pathname === '/';

  if (isRootPath) {
    // Vercel provides CF-IPCountry header; fallback to Accept-Language
    const country =
      request.headers.get('x-vercel-ip-country') ||
      request.headers.get('cf-ipcountry') ||
      null;

    if (country) {
      if (DACH_COUNTRIES.has(country)) {
        const url = request.nextUrl.clone();
        url.pathname = '/de';
        return NextResponse.redirect(url, { status: 302 });
      }
      if (BALKAN_COUNTRIES.has(country)) {
        const url = request.nextUrl.clone();
        url.pathname = '/bs';
        return NextResponse.redirect(url, { status: 302 });
      }
    }

    // Fallback: check Accept-Language header
    const acceptLang = request.headers.get('accept-language') ?? '';
    if (/^de(-[A-Z]{2})?/i.test(acceptLang)) {
      const url = request.nextUrl.clone();
      url.pathname = '/de';
      return NextResponse.redirect(url, { status: 302 });
    }
    if (/^(bs|hr|sr)(-[A-Z]{2})?/i.test(acceptLang)) {
      const url = request.nextUrl.clone();
      url.pathname = '/bs';
      return NextResponse.redirect(url, { status: 302 });
    }
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all paths except static files and Next.js internals
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};
