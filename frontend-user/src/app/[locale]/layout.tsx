import * as React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { MainLayout } from '@/components/layout/main-layout';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'sv' }];
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <MainLayout>{children}</MainLayout>
    </NextIntlClientProvider>
  );
} 