import httpStatus from 'http-status';
import { Middleware } from '../types/middleware.js';

const { NOT_FOUND } = httpStatus;

const notFoundHandler: Middleware.Handler = (
  req,
  _res,
  next
): void => {
  const error: Error & { status?: number } = new Error(
    `Route not found: ${req.method} ${req.originalUrl}`
  );

  error.status = NOT_FOUND;

  next(error);
};

export default notFoundHandler;
