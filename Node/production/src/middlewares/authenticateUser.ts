
import createError from 'http-errors';
import httpStatus from 'http-status';

import { verifyToken } from '../utils/token.js';
import { Middleware } from '../types/middleware.js';

const authenticateUser: Middleware.Handler = async (
  req,
  _res,
  next
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(
        createError(httpStatus.UNAUTHORIZED, 'Authentication Failed')
      );
    }

    const [, token] = authHeader.split(' ');

    if (!token) {
      return next(
        createError(httpStatus.UNAUTHORIZED, 'Invalid Authorization Header')
      );
    }

    const payload = await verifyToken(token);

    if (!payload) {
      return next(
        createError(httpStatus.UNAUTHORIZED, 'Invalid or Expired Token')
      );
    }

    req.user = payload;
    next();
  } catch (error) {
    const err = error as Error;
    next(
      createError(
        httpStatus.UNAUTHORIZED,
        err.message || 'Unauthorized'
      )
    );
  }
};

export default authenticateUser;
