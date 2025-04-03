import { ApiResponse, PaginatedResponse, User, AutomationScript, ScriptExecution } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const data = await response.json();
  
  if (!response.ok) {
    throw new ApiError(data.error || 'An error occurred');
  }
  
  return {
    success: true,
    message: data.message || 'Success',
    data: data.data,
    error: data.error
  };
}

export const api = {
  // Auth endpoints
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    return handleResponse<{ user: User }>(response);
  },

  register: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return handleResponse<{ user: User }>(response);
  },

  logout: async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return handleResponse<void>(response);
  },

  // Script endpoints
  getScripts: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) searchParams.append(key, value.toString());
      });
    }
    const response = await fetch(`${API_URL}/scripts?${searchParams}`, {
      credentials: 'include',
    });
    return handleResponse<PaginatedResponse<AutomationScript>>(response);
  },

  getScript: async (id: string) => {
    const response = await fetch(`${API_URL}/scripts/${id}`, {
      credentials: 'include',
    });
    return handleResponse<AutomationScript>(response);
  },

  executeScript: async (id: string, parameters?: Record<string, any>) => {
    const response = await fetch(`${API_URL}/scripts/${id}/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ parameters }),
    });
    return handleResponse<ScriptExecution>(response);
  },

  // Execution endpoints
  getExecutions: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) searchParams.append(key, value.toString());
      });
    }
    const response = await fetch(`${API_URL}/executions?${searchParams}`, {
      credentials: 'include',
    });
    return handleResponse<PaginatedResponse<ScriptExecution>>(response);
  },

  getExecution: async (id: string) => {
    const response = await fetch(`${API_URL}/executions/${id}`, {
      credentials: 'include',
    });
    return handleResponse<ScriptExecution>(response);
  },

  // Profile endpoints
  getProfile: async () => {
    const response = await fetch(`${API_URL}/profile`, {
      credentials: 'include',
    });
    return handleResponse<User>(response);
  },

  updateProfile: async (data: {
    firstName?: string;
    lastName?: string;
    email?: string;
  }) => {
    const response = await fetch(`${API_URL}/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return handleResponse<User>(response);
  },

  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const response = await fetch(`${API_URL}/profile/password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return handleResponse<void>(response);
  }
}; 