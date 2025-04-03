import { useState, useEffect } from 'react';
import { get, post } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import { useAuth } from '@/lib/auth';

interface TokenBalance {
  available: number;
  used: number;
  total: number;
}

export function useTokens() {
  const [balance, setBalance] = useState<TokenBalance>({
    available: 0,
    used: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    loadBalance();
  }, [token]);

  const loadBalance = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await get<TokenBalance>('/tokens/balance', token);
      setBalance(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load token balance');
    } finally {
      setLoading(false);
    }
  };

  const purchaseTokens = async (amount: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await post<TokenBalance>('/tokens/purchase', { amount }, token);
      setBalance(response.data);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to purchase tokens');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getTokenPrice = (amount: number) => {
    // This is a simplified calculation. In a real application,
    // you would want to get the current price from the backend
    const basePrice = 0.1; // $0.10 per token
    return amount * basePrice;
  };

  return {
    balance,
    loading,
    error,
    loadBalance,
    purchaseTokens,
    getTokenPrice,
  };
} 