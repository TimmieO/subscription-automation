import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, Zap } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-4 text-slate-800 dark:text-slate-200">
            Simple, Transparent{" "}
            <span className="text-primary">Pricing</span>
          </h1>
          <p className="mx-auto max-w-[600px] text-slate-500 dark:text-slate-400 md:text-xl">
            Choose the perfect plan for your subscription management needs
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-slate-100 dark:bg-slate-800">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular
                    ? "bg-gradient-to-br from-primary to-accent text-white shadow-lg scale-105"
                    : "bg-white dark:bg-slate-900"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-white text-primary text-sm font-semibold px-4 py-1 rounded-full shadow-sm">
                      Most Popular
                    </div>
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-200">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-slate-500 dark:text-slate-400">/month</span>
                  </div>
                  <p className="mt-4 text-slate-500 dark:text-slate-400">
                    {plan.description}
                  </p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="w-full"
                  variant={plan.popular ? "secondary" : "default"}
                >
                  <Link href="/register">
                    Get Started
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-slate-200">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 bg-slate-100 dark:bg-slate-800 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{faq.question}</h3>
                <p className="text-slate-500 dark:text-slate-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="mx-auto max-w-[600px] mb-8 text-white/80">
            Join thousands of users who have simplified their subscription management
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
          >
            <Link href="/register">
              Start Your Free Trial
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

const plans = [
  {
    name: "Starter",
    price: "29",
    description: "Perfect for small businesses and startups",
    features: [
      "Up to 50 subscriptions",
      "Basic analytics",
      "Email support",
      "Automated payments",
      "Basic reporting",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "79",
    description: "Ideal for growing businesses",
    features: [
      "Up to 200 subscriptions",
      "Advanced analytics",
      "Priority support",
      "Custom workflows",
      "Advanced reporting",
      "API access",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "199",
    description: "For large organizations",
    features: [
      "Unlimited subscriptions",
      "Custom solutions",
      "24/7 support",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
    ],
    popular: false,
  },
];

const faqs = [
  {
    question: "Can I change my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers for enterprise plans.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes, we offer a 14-day free trial on all plans. No credit card required.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee if you're not satisfied with our service.",
  },
]; 