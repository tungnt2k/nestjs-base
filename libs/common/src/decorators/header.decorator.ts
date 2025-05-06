import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const FromHeader = createParamDecorator((field: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const headers = request.headers;
  return field ? headers?.[field] : headers;
});
