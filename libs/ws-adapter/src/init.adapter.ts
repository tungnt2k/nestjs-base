import type { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { RedisIoAdapter } from './redis-io.adapter';
import { SocketStateService } from './socket-state.service';

export const initAdapters = async (app: INestApplication): Promise<INestApplication> => {
  const socketStateService = app.get(SocketStateService);
  const jwtService = app.get(JwtService);
  const configService = app.get(ConfigService);

  const redisIoAdapter = new RedisIoAdapter(app, socketStateService, jwtService, configService);

  await redisIoAdapter.connectToRedis();

  app.useWebSocketAdapter(redisIoAdapter);

  return app;
};
