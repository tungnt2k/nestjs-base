/* eslint-disable @typescript-eslint/await-thenable */
import type { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiConfigService } from 'src/core/shared/services';

import { RedisIoAdapter } from './redis-io.adapter';
import { SocketStateService } from './socket-state.service';

export const initAdapters = async (app: INestApplication): Promise<INestApplication> => {
  const socketStateService = app.get(SocketStateService);
  const jwtService = app.get(JwtService);
  const configService = app.get(ApiConfigService);

  const redisIoAdapter = new RedisIoAdapter(app, socketStateService, jwtService, configService);

  await redisIoAdapter.connectToRedis();

  app.useWebSocketAdapter(redisIoAdapter);

  return app;
};
