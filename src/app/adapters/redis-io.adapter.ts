/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { INestApplicationContext, WebSocketAdapter } from '@nestjs/common';
import type { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import type { Server, ServerOptions, Socket } from 'socket.io';
import { User } from 'src/core/lib/database';
import { ApiConfigService } from 'src/core/shared/services';

import { LoggerService } from '../../core/lib';
import { userRoomKey } from '../events/enum';
import type { SocketStateService } from './socket-state.service';

interface ITokenPayload {
  userId: number;
  email: string;
  nickname: string;
}

export interface IAuthenticatedSocket extends Socket {
  auth: ITokenPayload;
  data: User;
}

export class RedisIoAdapter extends IoAdapter implements WebSocketAdapter {
  private logger = new LoggerService(RedisIoAdapter.name);

  public constructor(
    private readonly app: INestApplicationContext,
    private socketStateService: SocketStateService,
    private jwtService: JwtService,
    private configService: ApiConfigService,
  ) {
    super(app);
  }

  private adapterConstructor: ReturnType<typeof createAdapter>;

  async connectToRedis() {
    try {
      const pubClient = createClient({ url: this.configService.redisConfig.url });
      const subClient = pubClient.duplicate();

      pubClient.on('error', (err) => this.logger.error('Redis Client Error', err));
      subClient.on('error', (err) => this.logger.error('Redis Client Error', err));

      await Promise.all([pubClient.connect(), subClient.connect()]);

      this.adapterConstructor = createAdapter(pubClient, subClient);
    } catch (error) {
      this.logger.error(error);
    }
  }

  createIOServer(port: number, options?: ServerOptions): Server {
    const server = super.createIOServer(port, options);

    server.adapter(this.adapterConstructor);

    return server;
  }

  public create(port: number, options: ServerOptions): Server {
    const server = this.createIOServer(port, options);

    server.use((socket: IAuthenticatedSocket, next) => {
      try {
        const token = (socket.handshake.query?.token || socket.handshake.headers?.authorization) as string;

        if (!token) {
          throw new Error('No token provided');
        }

        const payload = this.jwtService.verify(token);

        socket.auth = {
          userId: payload.sub,
          email: payload.email,
          nickname: payload.nickname,
        };

        return next();
      } catch (error) {
        setTimeout(() => {
          socket.disconnect(true);
        });

        return next(error);
      }
    });

    return server;
  }

  public bindClientConnect(server: Server, callback: Function): void {
    server.on('connection', async (socket: IAuthenticatedSocket) => {
      if (socket?.auth) {
        await this.socketStateService.add(socket.auth.userId, server, socket, true);

        await socket.join(userRoomKey(socket.auth.userId));

        socket.on('disconnect', async () => {
          await this.socketStateService.remove(socket.auth.userId, socket);

          socket.removeAllListeners('disconnect');
        });

        socket.on('disconnecting', (reason) => {
          this.logger.log(
            `Socket ${socket.id} ${
              socket?.auth?.userId ? ` | ${socket.auth.userId}` : ''
            } disconnecting because of ${reason}`,
          );

          socket.removeAllListeners('disconnecting');

          for (const room of socket.rooms) {
            socket.to(room).emit('user-disconnected', { userId: socket.auth.userId });
          }
        });
      }

      callback(socket);
    });
  }
}
