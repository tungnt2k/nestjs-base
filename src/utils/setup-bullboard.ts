import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter as BullBoardExpress } from '@bull-board/express';
import { NestApplication } from '@nestjs/core';
import { Queue } from 'bull';
import { QueueJob } from 'src/common/enum';

export function setupBullBoard(app: NestApplication) {
  const serverAdapter = new BullBoardExpress();
  serverAdapter.setBasePath('/bull-board');

  const exampleQueue = app.get<Queue>(`BullQueue_${QueueJob.EXAMPLE_QUEUE_JOB}`);

  createBullBoard({
    queues: [new BullAdapter(exampleQueue)],
    serverAdapter,
  });

  app.use('/bull-board', serverAdapter.getRouter());
}
