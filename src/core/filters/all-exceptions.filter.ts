/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import type { HttpArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';
import type { Response } from 'express';
import { QueryFailedError } from 'typeorm';

import { LoggerService } from '../lib';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  private static handleResponse(response: Response, exception: HttpException | QueryFailedError | Error): void {
    let responseBody: any = {
      success: false,
      message: 'Internal server error',
    };
    let statusCode = HttpStatus.BAD_REQUEST;

    if (exception instanceof HttpException) {
      responseBody = exception.getResponse();
      statusCode = exception.getStatus();
    } else if (exception instanceof QueryFailedError) {
      statusCode = HttpStatus.BAD_REQUEST;
      responseBody = {
        statusCode,
        message: exception.message,
      };
    } else if (exception instanceof Error) {
      responseBody = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: exception.message,
      };
    }

    response.status(statusCode).json(responseBody);
  }

  catch(exception: HttpException | Error, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse();

    // Handling error message and logging
    this.handleMessage(exception);

    // Response to client
    AllExceptionFilter.handleResponse(response, exception);
  }

  private handleMessage(exception: HttpException | QueryFailedError | Error): void {
    let message = 'Internal Server Error';

    if (exception instanceof HttpException) {
      message = JSON.stringify(exception.getResponse());
    } else if (exception instanceof QueryFailedError) {
      message = exception.stack?.toString();
    } else if (exception instanceof Error) {
      message = exception.stack?.toString();
    }

    this.logger.error(message);
  }
}
