'use client';

import { useLanguage } from '@/lib/language';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-200 sm:text-5xl md:text-6xl">
              {t('home.hero.title')}
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-slate-500 dark:text-slate-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              {t('home.hero.subtitle')}
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link href="/register">
                  <Button size="lg" className="w-full">
                    {t('nav.get_started')}
                  </Button>
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link href="/pricing">
                  <Button variant="outline" size="lg" className="w-full">
                    {t('nav.learn_more')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-slate-100 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
              {t('home.features.title')}
            </h2>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
              {t('home.features.subtitle')}
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Feature 1 */}
              <div className="relative p-6 bg-white dark:bg-slate-900 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
                  {t('home.feature1.title')}
                </h3>
                <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
                  {t('home.feature1.description')}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="relative p-6 bg-white dark:bg-slate-900 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
                  {t('home.feature2.title')}
                </h3>
                <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
                  {t('home.feature2.description')}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="relative p-6 bg-white dark:bg-slate-900 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
                  {t('home.feature3.title')}
                </h3>
                <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
                  {t('home.feature3.description')}
                </p>
              </div>

              {/* Feature 4 */}
              <div className="relative p-6 bg-white dark:bg-slate-900 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
                  {t('home.feature4.title')}
                </h3>
                <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
                  {t('home.feature4.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
              {t('home.testimonials.title')}
            </h2>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
              {t('home.testimonials.subtitle')}
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Testimonial 1 */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
                <p className="text-slate-500 dark:text-slate-400">
                  {t('home.testimonial1.quote')}
                </p>
                <div className="mt-4">
                  <p className="text-base font-medium text-slate-800 dark:text-slate-200">
                    {t('home.testimonial1.name')}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t('home.testimonial1.role')}
                  </p>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
                <p className="text-slate-500 dark:text-slate-400">
                  {t('home.testimonial2.quote')}
                </p>
                <div className="mt-4">
                  <p className="text-base font-medium text-slate-800 dark:text-slate-200">
                    {t('home.testimonial2.name')}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t('home.testimonial2.role')}
                  </p>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
                <p className="text-slate-500 dark:text-slate-400">
                  {t('home.testimonial3.quote')}
                </p>
                <div className="mt-4">
                  <p className="text-base font-medium text-slate-800 dark:text-slate-200">
                    {t('home.testimonial3.name')}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t('home.testimonial3.role')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-accent py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              {t('home.cta.title')}
            </h2>
            <p className="mt-4 text-lg text-white/90">
              {t('home.cta.subtitle')}
            </p>
            <div className="mt-8">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  {t('home.cta.button')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 