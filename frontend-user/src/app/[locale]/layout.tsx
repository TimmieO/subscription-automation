import * as React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { locales } from '@/config/locales';
import { notFound } from 'next/navigation';

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
      <body className={`${inter.className} bg-slate-50 dark:bg-slate-800 min-h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
} 