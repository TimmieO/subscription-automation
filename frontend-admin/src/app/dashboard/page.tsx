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
import styled from 'styled-components';

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

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const DashboardHeader = styled.div`
  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  p {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Icon = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

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
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  return (
    <ProtectedRoute requiredRole="ROLE_ADMIN">
      <DashboardContainer>
        <DashboardHeader>
          <h1>Dashboard</h1>
          <p>Overview of your subscription automation platform</p>
        </DashboardHeader>

        <DateFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onPresetSelect={handlePresetSelect}
        />

        <MetricsGrid>
          <MetricCard
            title="Total Users"
            value={metrics.totalUsers}
            icon={
              <Icon>
                <UserGroupIcon />
              </Icon>
            }
            trend={{ value: 12, isPositive: true }}
          />
          <MetricCard
            title="Active Scripts"
            value={metrics.activeScripts}
            icon={
              <Icon>
                <DocumentTextIcon />
              </Icon>
            }
          />
          <MetricCard
            title="Scripts (24h)"
            value={metrics.scriptsLast24h}
            icon={
              <Icon>
                <ClockIcon />
              </Icon>
            }
            trend={{ value: 8, isPositive: true }}
          />
          <MetricCard
            title="Tokens Used Today"
            value={metrics.tokensUsedToday}
            icon={
              <Icon>
                <CurrencyDollarIcon />
              </Icon>
            }
          />
        </MetricsGrid>

        <Charts
          userGrowthData={userGrowthData}
          scriptExecutionData={scriptExecutionData}
          tokenUsageData={tokenUsageData}
        />
      </DashboardContainer>
    </ProtectedRoute>
  );
} 