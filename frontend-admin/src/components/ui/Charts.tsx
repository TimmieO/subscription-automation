import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string | string[];
  }[];
}

interface ChartsProps {
  userGrowthData: ChartData;
  scriptExecutionData: ChartData;
  tokenUsageData: ChartData;
}

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ChartCard = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 1.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const ChartTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
`;

export default function Charts({ userGrowthData, scriptExecutionData, tokenUsageData }: ChartsProps) {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <ChartsGrid>
      <ChartCard>
        <ChartTitle>User Growth</ChartTitle>
        <Line options={chartOptions} data={userGrowthData} />
      </ChartCard>
      <ChartCard>
        <ChartTitle>Script Executions</ChartTitle>
        <Bar options={chartOptions} data={scriptExecutionData} />
      </ChartCard>
      <ChartCard>
        <ChartTitle>Token Usage Distribution</ChartTitle>
        <Doughnut options={chartOptions} data={tokenUsageData} />
      </ChartCard>
    </ChartsGrid>
  );
} 