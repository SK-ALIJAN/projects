import type { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import createHttpError from 'http-errors';
import httpStatus from 'http-status';

import { consoleLogger } from '../config/log.config.js';

/* ================= SEND VERIFICATION EMAIL LIMITER ================= */
export const sendVerificationEmailLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 3,
  message: 'You have exceeded the limit, please try again after 24 hours',

  keyGenerator: (req: Request): string => {
    return `${req.user?.id ?? req.ip}`;
  },

  handler: (_req: Request, _res: Response, next: NextFunction) => {
    consoleLogger.warn('Send verification email rate limit exceeded');

    next(
      createHttpError(
        httpStatus.CONFLICT,
        'You have exceeded the attempt limit, please try again after 24 hours'
      )
    );
  },

  headers: true
});

/* ================= VERIFY EMAIL LIMITER ================= */
export const verifyEmailLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 5,
  message: 'You have exceeded the limit, please try again after 24 hours',

  handler: (_req: Request, _res: Response, next: NextFunction) => {
    consoleLogger.warn('Verify email rate limit exceeded');

    next(
      createHttpError(
        httpStatus.CONFLICT,
        'You have exceeded the attempt limit, please try again after 24 hours'
      )
    );
  },

  headers: true
});
