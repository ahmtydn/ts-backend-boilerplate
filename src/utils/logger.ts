import { existsSync, mkdirSync } from 'fs';
import path, { join } from 'path';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import { LOG_DIR } from '../config';

declare global {
  namespace NodeJS {
    interface Process {
      pkg?: any;
    }
  }
}
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const dirname = process.pkg ? path.dirname(process.execPath) : __dirname;
// logs dir
const logDir: string = join(dirname, LOG_DIR);

if (process.env.NODE_ENV !== 'production') {
  if (!existsSync(logDir)) {
    mkdirSync(logDir);
  }
}

// Define log format
const logFormat = winston.format.printf(info => {
  let message = `${info.timestamp} ${info.level}: ${info.message}`;
  if (info.stack) {
    message += `\nStack: ${info.stack}`;
  }
  return message;
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
    winston.format.colorize({ all: true }),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.splat(), winston.format.colorize(), winston.format.errors({ stack: true })),
      handleExceptions: true,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/debug', // log file /logs/debug/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      json: true,
      zippedArchive: true,
    }),
  );

  logger.add(
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error', // log file /logs/error/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      handleExceptions: true,
      json: true,
      zippedArchive: true,
    }),
  );
}

const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};

export { logger, stream };
