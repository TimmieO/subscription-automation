'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { ArrowRight, CheckCircle, Zap, BarChart, Shield, Clock } from "lucide-react";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-slate-50 dark:bg-slate-900">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-slate-800 dark:text-slate-200">
                Streamline Your{" "}
                <span className="text-primary">Subscription Management</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-slate-500 dark:text-slate-400 md:text-xl">
                Take control of your subscriptions with our powerful automation platform.
                Save time, reduce costs, and never miss a payment again.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <Button asChild size="lg" variant="gradient" className="gap-2">
                <Link href="/pricing">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-100 dark:bg-slate-800">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-800 dark:text-slate-200">
              Why Choose Our Platform?
            </h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400">
              Powerful features to manage your subscriptions efficiently
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative p-6 bg-white dark:bg-slate-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{feature.title}</h3>
                </div>
                <p className="text-slate-500 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-800 dark:text-slate-200">
              What Our Users Say
            </h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400">
              Join thousands of satisfied customers
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 bg-slate-100 dark:bg-slate-800 rounded-xl shadow-sm"
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <CheckCircle
                      key={i}
                      className="w-4 h-4 text-accent fill-accent"
                    />
                  ))}
                </div>
                <p className="mb-4 text-slate-500 dark:text-slate-400">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10" />
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{testimonial.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Ready to Get Started?
          </h2>
          <p className="mx-auto max-w-[600px] mb-8 text-white/80">
            Join thousands of users who have simplified their subscription management
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="gap-2"
          >
            <Link href="/pricing">
              Start Your Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "Automated Payments",
    description:
      "Never miss a payment with our automated subscription management system.",
    icon: <Zap className="w-6 h-6 text-primary" />,
  },
  {
    title: "Smart Analytics",
    description:
      "Get insights into your subscription spending and optimize your budget.",
    icon: <BarChart className="w-6 h-6 text-primary" />,
  },
  {
    title: "Secure Platform",
    description:
      "Your data is protected with enterprise-grade security measures.",
    icon: <Shield className="w-6 h-6 text-primary" />,
  },
  {
    title: "Time-Saving Automation",
    description:
      "Automate repetitive tasks and focus on what matters most to your business.",
    icon: <Clock className="w-6 h-6 text-primary" />,
  },
];

const testimonials = [
  {
    quote:
      "This platform has completely transformed how we manage our subscriptions. It's a game-changer!",
    name: "Sarah Johnson",
    role: "Finance Manager",
  },
  {
    quote:
      "The automation features save us hours every month. Highly recommended!",
    name: "Michael Chen",
    role: "Business Owner",
  },
  {
    quote:
      "Finally, a solution that makes subscription management simple and efficient.",
    name: "Emily Davis",
    role: "Operations Director",
  },
]; 