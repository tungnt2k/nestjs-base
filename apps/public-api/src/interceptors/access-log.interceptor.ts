import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AccessLogInterceptor implements NestInterceptor {
  constructor(
    @InjectPinoLogger(AccessLogInterceptor.name)
    protected readonly logger: PinoLogger,
  ) {}

  /**
   * @param context
   * @param next
   *
   * Sample AccessLog:
   * ip: ::ffff:172.21.0.1
   * responseCode: 200
   * responseTime: 16ms
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const className = context.getClass().name;
    const functionName = context.getHandler().name;
    const res = context.switchToHttp().getResponse();
    const request = context.switchToHttp().getRequest<Request>();
    const responseCode = res.statusCode;
    const now = Date.now();

    this.logger.info(
      {
        userId: request.user?.userId,
        ...request.body,
        ...request.params,
        ...request.query,
        class: className,
        function: functionName,
      },
      'request info',
    );

    return next.handle().pipe(
      tap({
        next: (_data) => {
          this.logger.debug(
            {
              responseCode,
              responseTime: `${Date.now() - now}ms`,
              class: className,
              function: functionName,
            },
            'response info',
          );
        },
        error: (err) => {
          const bodyError = {
            class: className,
            function: functionName,
            responseCode: err.status,
            errors: err.response,
            msgErr: err.message,
            responseTime: `${Date.now() - now}ms`,
          };
          this.shouldLogError(err)
            ? this.logger.error(bodyError, 'response info')
            : this.logger.warn(bodyError, 'response info');
        },
      }),
    );
  }

  private shouldLogError(error: Record<string, any>): boolean {
    if (Number(error.status) && error.status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      return true;
    }
    return false;
  }
}
