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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-800">
        <h2 className="mb-4 text-lg font-medium text-slate-900 dark:text-white">
          User Growth
        </h2>
        <Line options={chartOptions} data={userGrowthData} />
      </div>
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-800">
        <h2 className="mb-4 text-lg font-medium text-slate-900 dark:text-white">
          Script Executions
        </h2>
        <Bar options={chartOptions} data={scriptExecutionData} />
      </div>
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-800">
        <h2 className="mb-4 text-lg font-medium text-slate-900 dark:text-white">
          Token Usage Distribution
        </h2>
        <Doughnut options={chartOptions} data={tokenUsageData} />
      </div>
    </div>
  );
} 