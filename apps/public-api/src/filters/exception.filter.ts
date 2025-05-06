import { currentMilliTime } from '@app/common/utils/utils';
import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Response } from 'express';

@Catch(BadRequestException)
export class HttpBadRequestExceptionFilter implements ExceptionFilter {
  catch(error: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const resp =
      error.getResponse() === 'string'
        ? { message: error.getResponse().toString() }
        : (error.getResponse() as Record<string, any>);

    let message = isArray(resp.message) && resp.message?.length ? resp.message[0] : resp;
    message = message?.message ? message.message : message;
    response.status(error.getStatus()).json({
      msg: message,
      status_code: error.getStatus(),
      timestamp: currentMilliTime(),
      path: request.url,
    });
  }
}
