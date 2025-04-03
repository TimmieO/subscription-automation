import { useState, useEffect } from 'react';
import { Script } from '@/types';
import { get } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import { useAuth } from '@/lib/auth';

export function useScripts() {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    loadScripts();
  }, [token]);

  const loadScripts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await get<Script[]>(API_ENDPOINTS.SCRIPTS.LIST, token);
      setScripts(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load scripts');
    } finally {
      setLoading(false);
    }
  };

  const getScriptById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await get<Script>(API_ENDPOINTS.SCRIPTS.DETAIL(id), token);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load script');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const executeScript = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await get<{ executionId: string }>(
        API_ENDPOINTS.SCRIPTS.EXECUTE(id),
        token
      );
      return response.data.executionId;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to execute script');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    scripts,
    loading,
    error,
    loadScripts,
    getScriptById,
    executeScript,
  };
} 