import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/core/lib/database';

import { TaskService } from './task.service';

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
