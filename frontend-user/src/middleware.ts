import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'sv'],
  defaultLocale: 'en',
});

// Define protected paths that require authentication
const protectedPaths = [
  '/dashboard',
  '/scripts',
  '/executions',
  '/profile',
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Extract the locale and path without locale
  const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '');
  
  // Check if the path is protected (without locale prefix)
  const isProtectedPath = protectedPaths.some(path => 
    pathnameWithoutLocale === path || pathnameWithoutLocale.startsWith(`${path}/`)
  );

  // Handle internationalization first
  const response = await intlMiddleware(request);
  
  // If it's not a protected path, return the internationalized response
  if (!isProtectedPath) {
    return response;
  }

  // For protected routes, check authentication via cookie
  const authCookie = request.cookies.get('auth_token');
  
  if (!authCookie) {
    // Get the locale from the pathname or use default
    const locale = pathname.split('/')[1] || 'en';
    const url = new URL(`/${locale}/login`, request.url);
    url.searchParams.set('callbackUrl', pathnameWithoutLocale);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 