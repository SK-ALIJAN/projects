import { type Middleware } from '@reduxjs/toolkit';

/**
 * Example custom middleware
 * Logs actions in development
 */
export const loggerMiddleware: Middleware =
  () => (next) => (action) => {
    if (import.meta.env.DEV) {
      console.log('Dispatching:', action);
    }

    return next(action);
  };
