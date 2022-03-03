import { createLogger, transports as _transports, format as _format } from 'winston';
import winston from 'winston';

export const logger = createLogger({
  transports: [
    new winston.transports.Console(),
    new _transports.File({
      level: 'info',
      filename: 'info.log',
      json: true,
      format: _format.combine(_format.timestamp(),
        _format.json())
    }),
    new _transports.File({
      level: 'error',
      filename: 'error.log',
      json: true,
      format: _format.combine(_format.timestamp(),
        _format.json())
    })
  ]
});