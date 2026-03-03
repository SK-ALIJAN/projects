import { accessLogger } from '../config/log.config.js';
import { Middleware } from '../types/middleware.js';

const accessLogMiddleware: Middleware.Handler = (
  req,
  res,
  next
) => {
  // Ignore favicon noise
  if (req.originalUrl === '/favicon.ico') {
    return next();
  }

  const start = Date.now();

  res.on('finish', () => {
    const responseTime = Date.now() - start;

    accessLogger.info({
      ip: req.ip,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      contentLength: res.getHeader('content-length'),
      referrer: req.get('referrer'),
      userAgent: req.get('user-agent'),
      responseTime: `${responseTime}ms`
    });
  });

  next();
};

export default accessLogMiddleware;
