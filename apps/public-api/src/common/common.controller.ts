import { Controller, Get, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';

@ApiTags('Common')
@Controller('common')
export class CommonController {
  constructor() {}

  @Get('/ip')
  async getCountry(@Request() req: ExpressRequest) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    return {
      ip,
    };
  }
}
