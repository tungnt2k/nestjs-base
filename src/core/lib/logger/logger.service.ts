/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService extends Logger {
  error(message: string, trace?: string) {
    // add your tailored logic here
    super.error(message, trace);
  }

  warn(message: any, context?: string) {
    // TO DO
    super.warn(message, context);
  }

  log(message: any, context?: string) {
    // TO DO
    super.log(message, context);
  }

  debug(message: any, context?: string) {
    // TO DO
    super.debug(message, context);
  }

  verbose(message: any, context?: string) {
    // TO DO
    super.verbose(message, context);
  }
}
