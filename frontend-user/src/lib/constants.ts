export const APP_NAME = 'Subscription Automation Platform';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  SCRIPTS: {
    LIST: '/scripts',
    DETAIL: (id: string) => `/scripts/${id}`,
    EXECUTE: (id: string) => `/scripts/${id}/execute`,
  },
  EXECUTIONS: {
    LIST: '/executions',
    DETAIL: (id: string) => `/executions/${id}`,
  },
  SUBSCRIPTIONS: {
    LIST: '/subscriptions',
    DETAIL: (id: string) => `/subscriptions/${id}`,
    CANCEL: (id: string) => `/subscriptions/${id}/cancel`,
  },
  PROFILE: {
    UPDATE: '/profile',
  },
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  SCRIPTS: '/scripts',
  EXECUTIONS: '/executions',
  PROFILE: '/profile',
} as const;

export const TOKEN_PRICES = {
  BASIC: 1,
  PREMIUM: 2,
  ENTERPRISE: 5,
} as const;

export const SUBSCRIPTION_PLANS = {
  BASIC: {
    name: 'Basic',
    price: 9.99,
    tokens: 100,
    features: [
      'Access to basic scripts',
      '100 tokens per month',
      'Email support',
    ],
  },
  PREMIUM: {
    name: 'Premium',
    price: 19.99,
    tokens: 300,
    features: [
      'Access to all scripts',
      '300 tokens per month',
      'Priority support',
      'Advanced analytics',
    ],
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: 49.99,
    tokens: 1000,
    features: [
      'Access to all scripts',
      '1000 tokens per month',
      '24/7 support',
      'Advanced analytics',
      'Custom scripts',
      'API access',
    ],
  },
} as const; 