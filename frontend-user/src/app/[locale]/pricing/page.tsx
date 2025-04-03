'use client';

import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

const plans = [
  {
    name: 'Basic',
    price: '$9.99',
    period: 'month',
    description: 'Perfect for individuals and small teams',
    features: [
      'Up to 100 script executions per month',
      'Basic script library access',
      'Email support',
      'Basic analytics',
    ],
  },
  {
    name: 'Pro',
    price: '$29.99',
    period: 'month',
    description: 'Ideal for growing businesses',
    features: [
      'Up to 1,000 script executions per month',
      'Full script library access',
      'Priority email support',
      'Advanced analytics',
      'Custom script parameters',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'month',
    description: 'For large organizations with custom needs',
    features: [
      'Unlimited script executions',
      'Custom script development',
      '24/7 dedicated support',
      'Enterprise analytics',
      'Custom integrations',
      'SLA guarantee',
    ],
  },
];

export default function PricingPage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600">
          Choose the plan that best fits your needs
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name} className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold mb-2">
                {plan.price}
                <span className="text-lg text-gray-600">/{plan.period}</span>
              </div>
              <p className="text-gray-600">{plan.description}</p>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="text-center">
              {user ? (
                <Link href="/dashboard">
                  <Button>Go to Dashboard</Button>
                </Link>
              ) : (
                <Link href="/register">
                  <Button>Get Started</Button>
                </Link>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
        <p className="text-gray-600 mb-8">
          Contact our sales team for a tailored plan that meets your specific requirements
        </p>
        <Button variant="outline">Contact Sales</Button>
      </div>
    </div>
  );
} 