import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styled from 'styled-components';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: string;
}

const LoadingContainer = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const LoadingSpinner = styled.div`
  height: 2rem;
  width: 2rem;
  animation: spin 1s linear infinite;
  border-radius: 9999px;
  border: 4px solid ${({ theme }) => theme.colors.primary};
  border-top-color: transparent;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (!loading && user && (!user.roles || !user.roles.includes(requiredRole))) {
      router.push('/');
    }
  }, [user, loading, router, requiredRole]);

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  if (!user || !user.roles || !user.roles.includes(requiredRole)) {
    return null;
  }

  return <>{children}</>;
} 