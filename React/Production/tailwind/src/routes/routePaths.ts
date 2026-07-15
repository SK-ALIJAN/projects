export const ROUTES = {
  SIGN_UP: '/signup',
  SIGN_IN: '/signin',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  HOME: '/',
  UNAUTHORIZED: '/unauthorized',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
