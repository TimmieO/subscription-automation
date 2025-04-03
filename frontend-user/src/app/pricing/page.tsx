import { useTranslation } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

type TranslationFunction = {
  (key: string): string;
  (key: string, options: { returnObjects: true }): string[];
};

export default function PricingPage() {
  const translation = useTranslation();
  const t = translation.t as unknown as TranslationFunction;

  const plans: Plan[] = [
    {
      name: t('pricing.plans.starter.name'),
      price: t('pricing.plans.starter.price'),
      description: t('pricing.plans.starter.description'),
      features: t('pricing.plans.starter.features', { returnObjects: true }),
    },
    {
      name: t('pricing.plans.professional.name'),
      price: t('pricing.plans.professional.price'),
      description: t('pricing.plans.professional.description'),
      features: t('pricing.plans.professional.features', { returnObjects: true }),
      popular: true,
    },
    {
      name: t('pricing.plans.enterprise.name'),
      price: t('pricing.plans.enterprise.price'),
      description: t('pricing.plans.enterprise.description'),
      features: t('pricing.plans.enterprise.features', { returnObjects: true }),
    },
  ];

  const faqs = [
    {
      question: t('pricing.faqs.q1'),
      answer: t('pricing.faqs.a1'),
    },
    {
      question: t('pricing.faqs.q2'),
      answer: t('pricing.faqs.a2'),
    },
    {
      question: t('pricing.faqs.q3'),
      answer: t('pricing.faqs.a3'),
    },
    {
      question: t('pricing.faqs.q4'),
      answer: t('pricing.faqs.a4'),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          {t('pricing.title')}
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400">
          {t('pricing.subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`p-8 relative ${
              plan.popular
                ? 'border-primary shadow-lg scale-105'
                : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white text-sm font-medium px-4 py-1 rounded-full">
                  {t('pricing.most_popular')}
                </span>
              </div>
            )}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                {plan.name}
              </h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-slate-800 dark:text-slate-200">
                  ${plan.price}
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  {t('pricing.per_month')}
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                {plan.description}
              </p>
              <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                {t('pricing.get_started')}
              </Button>
            </div>
            <ul className="mt-8 space-y-4">
              {plan.features.map((feature: string) => (
                <li key={feature} className="flex items-center text-slate-600 dark:text-slate-300">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-200 mb-8">
          {t('pricing.faq.title')}
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                {faq.question}
              </h3>
              <p className="text-slate-500 dark:text-slate-400">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          {t('pricing.cta.title')}
        </h2>
        <p className="text-xl text-slate-500 dark:text-slate-400 mb-8">
          {t('pricing.cta.subtitle')}
        </p>
        <Button size="lg">{t('pricing.cta.button')}</Button>
      </div>
    </div>
  );
} 