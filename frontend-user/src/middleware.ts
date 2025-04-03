import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

// Define public paths that should have locale in URL
const publicPaths = [
  '/',
  '/pricing',
  '/login',
  '/register',
];

// Define protected paths that should NOT have locale in URL
const protectedPaths = [
  '/dashboard',
  '/scripts',
  '/executions',
  '/profile',
];

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'sv'],
  defaultLocale: 'en',
  // Always use locale prefix for public routes
  localePrefix: 'always',
});

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if the path is public or protected
  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
  
  const isProtectedPath = protectedPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );

  // Get the locale from the path or cookie
  const locale = pathname.split('/')[1];
  const isLocalePath = locale === 'en' || locale === 'sv';
  
  // If it's a protected path, check authentication
  if (isProtectedPath) {
    const authCookie = request.cookies.get('auth_token');
    
    if (!authCookie) {
      // Get the locale from cookie or use default
      const userLocale = request.cookies.get('NEXT_LOCALE')?.value || 'en';
      const url = new URL(`/${userLocale}/login`, request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
    
    // For protected routes, don't apply locale prefix
    return NextResponse.next();
  }
  
  // For public routes, apply internationalization
  if (isPublicPath) {
    // If the path already has a locale prefix, process it
    if (isLocalePath) {
      const response = await intlMiddleware(request);
      response.cookies.set('NEXT_LOCALE', locale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });
      return response;
    }

    // If no locale prefix, redirect to the default locale
    const defaultLocale = request.cookies.get('NEXT_LOCALE')?.value || 'en';
    const url = new URL(`/${defaultLocale}${pathname}`, request.url);
    return NextResponse.redirect(url);
  }
  
  // For any other path, just continue
  return NextResponse.next();
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