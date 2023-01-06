import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  @Cron('0 */5 * * * *', {
    name: 'processExample',
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  handleProcessExample() {
    this.logger.warn(`Start process at ${new Date().toDateString()}`);

    this.logger.warn('Done process.');
  }
}
