/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import type { Socket } from 'socket.io';

import { UserService } from '../../app/modules';

@Injectable()
export class WsJwtGuard implements CanActivate {
  private logger: Logger = new Logger(WsJwtGuard.name);

  constructor(private userService: UserService, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient<Socket>();

    try {
      const authToken = client.handshake?.query?.token as string;

      if (client?.data?.id) {
        return true;
      }

      if (!authToken) {
        throw new WsException('Unauthorized');
      }

      const decoded = this.jwtService.verify<{
        sub: number;
        publicAddress: string;
      }>(authToken, { secret: process.env.JWT_SECRET });

      const user = await this.userService.getUserProfile(decoded.sub);

      if (user) {
        client.data = user;
      }

      return Boolean(user);
    } catch (error) {
      this.logger.warn(error);

      setTimeout(() => {
        client.disconnect();
      }, 500);

      throw new WsException(error.message);
    }
  }
}
