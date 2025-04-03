'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import LoginForm from '@/components/auth/LoginForm';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 24rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export default function LoginPage() {
  const router = useRouter();
  const { isChecking, user } = useAuthRedirect(false);

  useEffect(() => {
    if (!isChecking && user) {
      router.push('/dashboard');
    }
  }, [isChecking, user, router]);

  if (isChecking || user) {
    return null;
  }

  return (
    <LoginContainer>
      <LoginCard>
        <LoginHeader>
          <h1>Welcome Back</h1>
          <p>Sign in to your admin account</p>
        </LoginHeader>
        <LoginForm />
      </LoginCard>
    </LoginContainer>
  );
} 