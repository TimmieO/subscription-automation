import { useState, useEffect } from 'react';
import { Subscription } from '@/types';
import { get, post } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import { useAuth } from '@/lib/auth';

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    loadSubscriptions();
  }, [token]);

  const loadSubscriptions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await get<Subscription[]>(API_ENDPOINTS.SUBSCRIPTIONS.LIST, token);
      setSubscriptions(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  };

  const getSubscriptionById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await get<Subscription>(API_ENDPOINTS.SUBSCRIPTIONS.DETAIL(id), token);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load subscription');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const cancelSubscription = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await post(API_ENDPOINTS.SUBSCRIPTIONS.CANCEL(id), {}, token);
      await loadSubscriptions();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel subscription');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getActiveSubscription = () => {
    return subscriptions.find(sub => sub.status === 'ACTIVE');
  };

  return {
    subscriptions,
    loading,
    error,
    loadSubscriptions,
    getSubscriptionById,
    cancelSubscription,
    getActiveSubscription,
  };
} 