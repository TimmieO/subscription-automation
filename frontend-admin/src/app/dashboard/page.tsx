'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { 
  UserGroupIcon, 
  DocumentTextIcon, 
  ClockIcon, 
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline';
import MetricCard from '@/components/ui/MetricCard';
import Charts from '@/components/ui/Charts';
import DateFilter from '@/components/ui/DateFilter';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

interface DashboardMetrics {
  totalUsers: number;
  activeScripts: number;
  scriptsLast24h: number;
  tokensUsedToday: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string | string[];
  }[];
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalUsers: 0,
    activeScripts: 0,
    scriptsLast24h: 0,
    tokensUsedToday: 0,
  });
  const [userGrowthData, setUserGrowthData] = useState<ChartData>({
    labels: [],
    datasets: [{
      label: 'New Users',
      data: [],
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.5)',
    }],
  });
  const [scriptExecutionData, setScriptExecutionData] = useState<ChartData>({
    labels: [],
    datasets: [{
      label: 'Executions',
      data: [],
      backgroundColor: 'rgba(99, 102, 241, 0.5)',
    }],
  });
  const [tokenUsageData, setTokenUsageData] = useState<ChartData>({
    labels: [],
    datasets: [{
      label: 'Tokens Used',
      data: [],
      backgroundColor: [
        'rgba(99, 102, 241, 0.5)',
        'rgba(59, 130, 246, 0.5)',
        'rgba(37, 99, 235, 0.5)',
      ],
    }],
  });
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  const fetchDashboardData = async (start: string, end: string) => {
    try {
      const [metricsResponse, chartsResponse] = await Promise.all([
        fetch('/api/dashboard/metrics'),
        fetch(`/api/dashboard/charts?startDate=${start}&endDate=${end}`),
      ]);

      if (metricsResponse.ok) {
        const metricsData = await metricsResponse.json();
        setMetrics(metricsData);
      }

      if (chartsResponse.ok) {
        const chartsData = await chartsResponse.json();
        setUserGrowthData({
          labels: chartsData.userGrowth.labels,
          datasets: [{
            ...userGrowthData.datasets[0],
            data: chartsData.userGrowth.data,
          }],
        });
        setScriptExecutionData({
          labels: chartsData.scriptExecutions.labels,
          datasets: [{
            ...scriptExecutionData.datasets[0],
            data: chartsData.scriptExecutions.data,
          }],
        });
        setTokenUsageData({
          labels: chartsData.tokenUsage.labels,
          datasets: [{
            ...tokenUsageData.datasets[0],
            data: chartsData.tokenUsage.data,
          }],
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchDashboardData(startDate, endDate);
  }, [startDate, endDate]);

  const handlePresetSelect = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <ProtectedRoute requiredRole="ROLE_ADMIN">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Overview of your subscription automation platform
          </p>
        </div>

        <DateFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onPresetSelect={handlePresetSelect}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Users"
            value={metrics.totalUsers}
            icon={<UserGroupIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
            trend={{ value: 12, isPositive: true }}
          />
          <MetricCard
            title="Active Scripts"
            value={metrics.activeScripts}
            icon={<DocumentTextIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
          />
          <MetricCard
            title="Scripts (24h)"
            value={metrics.scriptsLast24h}
            icon={<ClockIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
            trend={{ value: 8, isPositive: true }}
          />
          <MetricCard
            title="Tokens Used Today"
            value={metrics.tokensUsedToday}
            icon={<CurrencyDollarIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
          />
        </div>

        <Charts
          userGrowthData={userGrowthData}
          scriptExecutionData={scriptExecutionData}
          tokenUsageData={tokenUsageData}
        />
      </div>
    </ProtectedRoute>
  );
} 