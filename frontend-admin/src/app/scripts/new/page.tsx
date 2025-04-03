'use client';

import React from 'react';
import ScriptForm from '@/components/scripts/ScriptForm';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function NewScriptPage() {
  return (
    <ProtectedRoute requiredRole="ROLE_ADMIN">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            New Script
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Create a new automation script
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-800">
          <ScriptForm />
        </div>
      </div>
    </ProtectedRoute>
  );
} 