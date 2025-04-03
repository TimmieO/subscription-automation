import React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const Card = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 1.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardText = styled.div`
  p:first-child {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  p:last-child {
    margin-top: 0.5rem;
    font-size: 1.875rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const IconContainer = styled.div`
  border-radius: 9999px;
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.colors.primary}11;
`;

const TrendContainer = styled.div`
  margin-top: 1rem;
`;

const TrendValue = styled.div<{ $isPositive: boolean }>`
  display: inline-flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ $isPositive, theme }) => 
    $isPositive ? theme.colors.success : theme.colors.error};

  svg {
    margin-right: 0.25rem;
    height: 1rem;
    width: 1rem;
  }
`;

export default function MetricCard({ title, value, icon, trend }: MetricCardProps) {
  return (
    <Card>
      <CardContent>
        <CardText>
          <p>{title}</p>
          <p>{value}</p>
        </CardText>
        <IconContainer>
          {icon}
        </IconContainer>
      </CardContent>
      {trend && (
        <TrendContainer>
          <TrendValue $isPositive={trend.isPositive}>
            {trend.isPositive ? (
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            ) : (
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
            {trend.value}%
          </TrendValue>
        </TrendContainer>
      )}
    </Card>
  );
} 