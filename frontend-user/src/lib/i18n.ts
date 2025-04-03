'use client';

import { useTranslations } from 'next-intl';
import { type Locale } from '@/config/locales';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ 
  locales: ['en', 'sv'] as const,
  localePrefix: 'always'
});

export const locales = ['en', 'sv'] as const;
export const defaultLocale = 'en' as const;

// Public paths that should have locale in URL
const PUBLIC_PATHS = ['/', '/pricing', '/login', '/register'];

// Protected paths that should NOT have locale in URL
const PROTECTED_PATHS = ['/dashboard', '/scripts', '/executions', '/profile'];

// Check if a path is public
export function isPublicPath(path: string): boolean {
  return PUBLIC_PATHS.some(publicPath => 
    path === publicPath || path.startsWith(`${publicPath}/`)
  );
}

// Check if a path is protected
export function isProtectedPath(path: string): boolean {
  return PROTECTED_PATHS.some(protectedPath => 
    path === protectedPath || path.startsWith(`${protectedPath}/`)
  );
}

// Custom hook for handling translations
export function useTranslation(namespace: string = 'common') {
  return useTranslations(namespace);
} 