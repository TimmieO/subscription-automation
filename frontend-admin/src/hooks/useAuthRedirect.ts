import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

export function useAuthRedirect(requireAuth = true, redirectPath = '/login') {
  const router = useRouter();
  const { user, loading, refreshToken } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        
        if (!accessToken && requireAuth) {
          router.push(redirectPath);
          return;
        }

        if (accessToken) {
          const decoded = jwtDecode<JwtPayload>(accessToken);
          const isExpired = decoded.exp * 1000 < Date.now();

          if (isExpired) {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
              try {
                await refreshToken();
              } catch (error) {
                console.error('Token refresh failed:', error);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                if (requireAuth) {
                  router.push(redirectPath);
                }
              }
            } else if (requireAuth) {
              router.push(redirectPath);
            }
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        if (requireAuth) {
          router.push(redirectPath);
        }
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [router, requireAuth, redirectPath, refreshToken]);

  return { isChecking, user, loading };
} 