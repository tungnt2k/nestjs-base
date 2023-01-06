/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/require-await */
import { Logger } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

import { IAuthenticatedSocket } from '../adapters';
import { userRoomKey } from './enum';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('EventsGateway');

  async handleConnection(client: IAuthenticatedSocket) {
    if (client?.auth?.userId) {
      await client.join(userRoomKey(client.auth.userId));
    }

    this.logger.log(`Client connected: ${client.id} | ${client.auth?.userId}`);
  }

  async handleDisconnect(client: IAuthenticatedSocket) {
    this.logger.log(`Client disconnected: ${client.id} | ${client.auth?.userId}`);
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }

  sendEventToRoom(room: string, event: string, data: any) {
    this.server.to(room).emit(event, data);
  }

  broadcastEvent(event: string, data: any) {
    this.server.emit(event, data);
  }
}
