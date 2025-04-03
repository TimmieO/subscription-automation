'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export type Locale = 'en' | 'sv';

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

// Get locale from path or cookie
export function getLocaleFromPath(path: string): Locale {
  const pathSegments = path.split('/');
  const potentialLocale = pathSegments[1];
  
  if (potentialLocale === 'en' || potentialLocale === 'sv') {
    return potentialLocale;
  }
  
  // Try to get from cookie
  const cookieLocale = Cookies.get('NEXT_LOCALE') as Locale;
  if (cookieLocale === 'en' || cookieLocale === 'sv') {
    return cookieLocale;
  }
  
  // Default to English
  return 'en';
}

// Custom hook for handling translations
export function useTranslation(namespace: string = 'common') {
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  
  // Get current locale
  const locale = getLocaleFromPath(pathname);
  
  // Load translations
  useEffect(() => {
    async function loadTranslations() {
      try {
        setIsLoading(true);
        const response = await fetch(`/locales/${locale}/${namespace}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load translations: ${response.statusText}`);
        }
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error('Error loading translations:', error);
        // Fallback to empty translations
        setTranslations({});
      } finally {
        setIsLoading(false);
      }
    }
    
    loadTranslations();
  }, [locale, namespace]);
  
  // Translation function
  const t = useCallback((key: string, params?: Record<string, string | number>) => {
    // Split the key by dots to access nested properties
    const keys = key.split('.');
    let value: any = translations;
    
    // Traverse the translations object
    for (const k of keys) {
      if (value === undefined || value === null) {
        return key; // Return the key if translation is not found
      }
      value = value[k];
    }
    
    // If the value is not a string, return the key
    if (typeof value !== 'string') {
      return key;
    }
    
    // Replace parameters if provided
    if (params) {
      return Object.entries(params).reduce(
        (acc, [paramKey, paramValue]) => acc.replace(`{{${paramKey}}}`, String(paramValue)),
        value
      );
    }
    
    return value;
  }, [translations]);
  
  // Function to change language
  const changeLanguage = useCallback((newLocale: Locale) => {
    // Save the locale preference
    Cookies.set('NEXT_LOCALE', newLocale, { expires: 365 }); // 1 year
    
    // If on a public path, update the URL
    if (isPublicPath(pathname)) {
      const pathSegments = pathname.split('/');
      if (pathSegments[1] === 'en' || pathSegments[1] === 'sv') {
        // Replace the locale in the path
        pathSegments[1] = newLocale;
        const newPath = pathSegments.join('/');
        router.push(newPath);
      } else {
        // Add the locale to the path
        router.push(`/${newLocale}${pathname}`);
      }
    } else {
      // For protected paths, just reload the page to apply the new locale
      router.refresh();
    }
  }, [pathname, router]);
  
  return {
    t,
    locale,
    changeLanguage,
    isLoading
  };
} 