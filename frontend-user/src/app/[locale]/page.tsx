"use client";

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  // If user is logged in, redirect to dashboard
  if (user) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Welcome to Script Automation</h1>
        <p className="text-xl text-gray-600 mb-8">
          Automate your tasks with our powerful script execution platform
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/register">
            <Button>Get Started</Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline">View Pricing</Button>
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Easy to Use</h3>
          <p className="text-gray-600">
            Simple interface to browse and execute pre-built automation scripts
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Secure</h3>
          <p className="text-gray-600">
            Enterprise-grade security with role-based access control
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Scalable</h3>
          <p className="text-gray-600">
            Handle multiple script executions with ease
          </p>
        </Card>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
        <Link href="/register">
          <Button size="lg">Create Your Account</Button>
        </Link>
      </section>
    </div>
  );
} 