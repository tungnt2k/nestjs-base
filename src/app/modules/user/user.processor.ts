import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { CommonJobConcurrency, QueueJob, QueueJobProcessor } from 'src/common/enum';

@Processor(QueueJob.EXAMPLE_QUEUE_JOB)
export class UserProcessor {
  private readonly logger = new Logger(UserProcessor.name);

  @Process({ name: QueueJobProcessor.EXAMPLE, concurrency: CommonJobConcurrency })
  async processExample(job: Job) {
    await job.progress(50);
    this.logger.log('Run example job');
    await job.progress(100);
  }
}
