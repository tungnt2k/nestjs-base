/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const IpAddress = createParamDecorator((_data: string, ctx: ExecutionContext) => {
  const req: Request = ctx.switchToHttp().getRequest();
  const rawIp: string | undefined =
    req.header('x-forwarded-for') || req.socket.remoteAddress || req.socket.remoteAddress;
  const ipAddress = rawIp ? rawIp!.split(',')[0] : '';
  return ipAddress;
});
