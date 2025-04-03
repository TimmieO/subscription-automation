"use client";

import * as React from 'react';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/lib/auth';
import { MainLayout } from '@/components/layout/main-layout';
import { NextIntlClientProvider } from 'next-intl';
import { useLocale } from 'next-intl';
import { ThemeWrapper } from './providers/ThemeWrapper';

export function Providers({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const [messages, setMessages] = React.useState({});

  React.useEffect(() => {
    // Load messages based on locale
    import(`@/messages/${locale}.json`)
      .then((module) => {
        setMessages(module.default);
      })
      .catch((error) => {
        console.error('Failed to load messages:', error);
        // Fallback to English if loading fails
        import('@/messages/en.json')
          .then((module) => {
            setMessages(module.default);
          })
          .catch((error) => {
            console.error('Failed to load fallback messages:', error);
          });
      });
  }, [locale]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeWrapper>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <MainLayout>{children}</MainLayout>
          </AuthProvider>
        </NextIntlClientProvider>
      </ThemeWrapper>
    </ThemeProvider>
  );
} 