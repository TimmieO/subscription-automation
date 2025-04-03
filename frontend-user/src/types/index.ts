import { type ReactNode, type ChangeEvent } from 'react';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  subscription?: {
    level: string;
    tokensRemaining: number;
  };
}

export interface AuthState {
  user: User | null;
  loading: boolean;
}

export interface Subscription {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  tokenLimit: number;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  tokenLimit: number;
}

export interface AutomationScript {
  id: string;
  name: string;
  description: string;
  language: string;
  category: string;
  executionTime: number;
  popularity: number;
  author: string;
  lastUpdated: string;
  version: string;
  requirements: string[];
  parameters: {
    name: string;
    type: string;
    description: string;
    required: boolean;
  }[];
}

export interface ScriptExecution {
  id: string;
  scriptId: string;
  scriptName: string;
  status: 'success' | 'failed' | 'running';
  startedAt: string;
  endedAt?: string;
  duration?: number;
  triggeredBy: string;
  parameters?: Record<string, any>;
  result?: any;
  error?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
}

export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  error: string;
  success: string;
  warning: string;
  info: string;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  status?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export type Status = 'success' | 'error' | 'warning' | 'info' | 'loading';

export type ErrorType = {
  message: string;
  code?: string;
  details?: unknown;
};

export type LoadingState = {
  status: Status;
  error: ErrorType | null;
};

export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export interface InputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface SelectProps {
  name: string;
  label?: string;
  options: { label: string; value: string | number }[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
} 