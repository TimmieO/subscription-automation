'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ScriptForm from '@/components/scripts/ScriptForm';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

interface Script {
  id: number;
  name: string;
  description: string;
  type: string;
  isActive: boolean;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function EditScriptPage() {
  const params = useParams();
  const [script, setScript] = useState<Script | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScript = async () => {
      try {
        const response = await fetch(`/api/scripts/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch script');
        }
        const data = await response.json();
        setScript(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchScript();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!script) {
    return null;
  }

  return (
    <ProtectedRoute requiredRole="ROLE_ADMIN">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Edit Script
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Modify your automation script
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-800">
          <ScriptForm initialData={script} />
        </div>
      </div>
    </ProtectedRoute>
  );
} 