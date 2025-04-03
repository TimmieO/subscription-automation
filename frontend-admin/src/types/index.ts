export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'USER';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface AutomationScript {
  id: string;
  name: string;
  description: string;
  category: string;
  code: string;
  parameters: Record<string, any>;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
}

export interface ScriptExecution {
  id: string;
  script: AutomationScript;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  result?: any;
  error?: string;
  startedAt: string;
  completedAt?: string;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
} 