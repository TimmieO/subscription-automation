import { useState, useEffect } from 'react';
import { ExecutionLog } from '@/types';
import { get } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import { useAuth } from '@/lib/auth';

export function useExecutions() {
  const [executions, setExecutions] = useState<ExecutionLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    loadExecutions();
  }, [token]);

  const loadExecutions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await get<ExecutionLog[]>(API_ENDPOINTS.EXECUTIONS.LIST, token);
      setExecutions(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load executions');
    } finally {
      setLoading(false);
    }
  };

  const getExecutionById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await get<ExecutionLog>(API_ENDPOINTS.EXECUTIONS.DETAIL(id), token);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load execution');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const filterExecutions = (status?: string, searchQuery?: string) => {
    return executions.filter((execution) => {
      const matchesStatus = !status || execution.status.toLowerCase() === status.toLowerCase();
      const matchesSearch = !searchQuery || 
        execution.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        execution.scriptId.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  };

  return {
    executions,
    loading,
    error,
    loadExecutions,
    getExecutionById,
    filterExecutions,
  };
} 