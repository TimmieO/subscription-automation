import * as React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { locales } from '@/config/locales';
import { notFound } from 'next/navigation';
import { ThemeWrapper } from '@/components/providers/ThemeWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Subscription Automation',
  description: 'Automate your subscription management',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeWrapper>
          <Providers>{children}</Providers>
        </ThemeWrapper>
      </body>
    </html>
  );
} 