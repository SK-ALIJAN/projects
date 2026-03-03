import { errorLogger } from '../config/log.config.js';
import httpStatus from 'http-status';
import { Middleware } from '../types/middleware.js';
const { INTERNAL_SERVER_ERROR } = httpStatus;


const handleError: Middleware.ErrorHandler = (
  err,
  req,
  res,
  _next
): void => {
  const statusCode =
    typeof err?.status === 'number' && Number.isInteger(err.status)
      ? err.status
      : INTERNAL_SERVER_ERROR;

  errorLogger.error(
    `${req.ip} - "${req.method} ${req.originalUrl} HTTP/${req.httpVersion}" ${statusCode} - Error: ${err.message}`
  );

  console.log(
    'error message from handleError middleware=========>>>>',
    err.message,
    err.status
  );

  res.status(statusCode).json({
    success: false,
    message:
      statusCode === INTERNAL_SERVER_ERROR
        ? 'Something went wrong'
        : err.message
  });
};

export default handleError;
