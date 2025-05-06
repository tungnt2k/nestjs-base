import { ENVIRONMENT } from '@app/common/enums/enum';
import pino, { Level } from 'pino';
import { Options } from 'pino-http';

export function loggerOptions(environment: string, level: Level = 'debug', context: string): Options {
  const isLocal = environment === ENVIRONMENT.LOCAL;
  if (!['fatal', 'error', 'warn', 'info', 'debug', 'trace'].includes(level)) {
    level = 'debug';
  }

  return {
    logger: pino({
      formatters: {
        level: (label) => {
          return { level: label };
        },
        log(object) {
          if (Object.keys(object).length) {
            return {
              app: context,
              data: object,
            };
          }
          return;
        },
      },
      base: undefined,
      timestamp: () => `,"time": "${new Date(Date.now()).toISOString()}"`,
      transport: isLocal
        ? {
            target: 'pino-pretty',
            options: {
              colorize: isLocal,
              ignore: 'pid,hostname',
              singleLine: true,
            },
          }
        : undefined,
      level: level,
    }),
    autoLogging: false,
    serializers: {
      req: (req) => ({
        method: req.method,
        url: req.url,
      }),
    },
  };
}
