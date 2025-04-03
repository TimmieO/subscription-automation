import { useState, useEffect } from 'react';
import { User } from '@/types';
import { get, put } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import { useAuth } from '@/lib/auth';

export function useProfile() {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    loadProfile();
  }, [token]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await get<User>(API_ENDPOINTS.PROFILE.UPDATE, token);
      setProfile(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await put<User>(API_ENDPOINTS.PROFILE.UPDATE, data, token);
      setProfile(response.data);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    loadProfile,
    updateProfile,
  };
} 