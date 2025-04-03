"use client";

import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n';

export default function PricingPage() {
  const t = useTranslations();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">{t('pricing.title')}</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">{t('pricing.basic.title')}</h2>
          <p className="text-3xl font-bold mb-4">$9.99</p>
          <ul className="space-y-2 mb-6">
            <li>{t('pricing.basic.feature1')}</li>
            <li>{t('pricing.basic.feature2')}</li>
            <li>{t('pricing.basic.feature3')}</li>
          </ul>
          <Link href="/register">
            <Button className="w-full">{t('pricing.getStarted')}</Button>
          </Link>
        </Card>
        <Card className="p-6 border-2 border-primary">
          <h2 className="text-2xl font-semibold mb-4">{t('pricing.pro.title')}</h2>
          <p className="text-3xl font-bold mb-4">$19.99</p>
          <ul className="space-y-2 mb-6">
            <li>{t('pricing.pro.feature1')}</li>
            <li>{t('pricing.pro.feature2')}</li>
            <li>{t('pricing.pro.feature3')}</li>
          </ul>
          <Link href="/register">
            <Button className="w-full">{t('pricing.getStarted')}</Button>
          </Link>
        </Card>
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">{t('pricing.enterprise.title')}</h2>
          <p className="text-3xl font-bold mb-4">{t('pricing.enterprise.price')}</p>
          <ul className="space-y-2 mb-6">
            <li>{t('pricing.enterprise.feature1')}</li>
            <li>{t('pricing.enterprise.feature2')}</li>
            <li>{t('pricing.enterprise.feature3')}</li>
          </ul>
          <Link href="/register">
            <Button className="w-full">{t('pricing.contactUs')}</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
} 