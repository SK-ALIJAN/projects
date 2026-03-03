import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import appConfig from './index.js';

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);

/* ---------- ACCESS LOGGER ---------- */
const accessLogger = winston.createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new DailyRotateFile({
      filename: 'logs/access/access-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: `${appConfig.keepLogDays}d`
    })
  ]
});

/* ---------- ERROR LOGGER ---------- */
const errorLogger = winston.createLogger({
  level: 'error',
  format: logFormat,
  transports: [
    new DailyRotateFile({
      filename: 'logs/error/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: `${appConfig.keepLogDays}d`
    })
  ]
});

/* ---------- CONSOLE LOGGER ---------- */
const consoleLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()]
});

export {
  accessLogger,
  errorLogger,
  consoleLogger,
  winston
};
