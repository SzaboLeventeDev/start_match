import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const options = {
  file: {
    level: 'info',
    handleExceptions: true,
    maxSize: 5242880, // 5MB
    colorize: true,
    json: true,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    format: format.combine(format.colorize(), format.simple()),
  },
};

const logger = createLogger({
  exitOnError: false,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.json(),
    format.colorize({
      all: true,
      colors: {
        info: 'blue',
        error: 'red',
        warn: 'orange',
        debug: 'green',
      },
    }),
  ),
  handleRejections: true,
  transports: [
    new DailyRotateFile({
      ...options.file,
      level: 'error',
      filename: 'logs/error-%DATE%.log',
    }),
    new DailyRotateFile({
      ...options.file,
      level: 'warn',
      filename: 'logs/warn-%DATE%.log',
    }),
    new DailyRotateFile({
      ...options.file,
      level: 'info',
      filename: 'logs/info-%DATE%.log',
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      ...options.console,
      handleRejections: true,
    }),
  );
}

export default logger;
