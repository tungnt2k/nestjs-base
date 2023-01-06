import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, UnprocessableEntityException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { ValidationError } from 'class-validator';
import type { Response } from 'express';
import _ from 'lodash';

@Catch(UnprocessableEntityException)
export class BadRequestExceptionFilter implements ExceptionFilter<UnprocessableEntityException> {
  constructor(public reflector: Reflector) {}

  catch(exception: UnprocessableEntityException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const r = exception.getResponse() as { message: ValidationError[] };

    const msg = this.messageFilter(r.message);
    response.status(statusCode).json({
      success: false,
      statusCode,
      message: msg,
    });
  }

  private messageFilter(validationErrors: ValidationError[]): string {
    if (validationErrors?.length) {
      const { constraints } = _.first(validationErrors);
      const msg = _.first(Object.values(constraints));

      return msg;
    }

    return 'Bad Request';
  }
}
