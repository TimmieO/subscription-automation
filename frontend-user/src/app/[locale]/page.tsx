"use client";

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from '@/lib/i18n';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const t = useTranslations('home');

  // If user is logged in, redirect to dashboard
  if (user) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">
          {t('hero.title')} <span className="text-primary">{t('hero.titleHighlight')}</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {t('hero.description')}
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/register">
            <Button>{t('hero.getStarted')}</Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline">{t('hero.viewScripts')}</Button>
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">{t('features.easyToUse.title')}</h3>
          <p className="text-gray-600">
            {t('features.easyToUse.description')}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">{t('features.secure.title')}</h3>
          <p className="text-gray-600">
            {t('features.secure.description')}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">{t('features.flexible.title')}</h3>
          <p className="text-gray-600">
            {t('features.flexible.description')}
          </p>
        </Card>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-8">{t('cta.title')}</h2>
        <p className="text-lg text-gray-600 mb-8">{t('cta.description')}</p>
        <Link href="/register">
          <Button size="lg">{t('cta.button')}</Button>
        </Link>
      </section>
    </div>
  );
} 