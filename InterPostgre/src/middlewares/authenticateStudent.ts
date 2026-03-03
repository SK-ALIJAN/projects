import { Middleware } from '../types/middleware.js';
import createError from 'http-errors';
import httpStatus from 'http-status';

import { verifyToken } from '../utils/token.js';

const authenticateUser: Middleware.Handler = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next(
        createError(httpStatus.UNAUTHORIZED, 'Authentication Failed')
      );
    }

    const token = req.headers.authorization.split(' ')[1];
    const payload = await verifyToken(token);

    if (!payload) {
      return next(
        createError(httpStatus.UNAUTHORIZED, 'Unauthorized')
      );
    }

    req.user = payload;
    next();
  } catch (error: any) {
    next(
      createError(
        httpStatus.UNAUTHORIZED,
        error?.message || 'Unauthorized'
      )
    );
  }
};

export default authenticateUser;
