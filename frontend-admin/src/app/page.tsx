'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

export default function Home() {
  const router = useRouter();
  const { isChecking } = useAuthRedirect(true, '/dashboard');

  useEffect(() => {
    if (!isChecking) {
      router.push('/dashboard');
    }
  }, [isChecking, router]);

  return null;
} 