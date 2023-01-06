import { BullModule } from '@nestjs/bull';
import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QueueJob } from 'src/common/enum';

import { ApiConfigService } from '../../shared/services';
import { IORedisModule } from './io-redis.module';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [
    IORedisModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ApiConfigService) => {
        const logger = new Logger('IORedisModule');

        return {
          connectionOptions: {
            host: configService.redisConfig.host,
            port: configService.redisConfig.port,
          },
          onClientReady: (client) => {
            logger.log('Redis client ready');

            client.on('error', (err) => {
              logger.error('Redis Client Error: ', err);
            });

            client.on('connect', () => {
              logger.log(`Connected to redis on ${client.options.host}:${client.options.port}`);
            });
          },
        };
      },
      inject: [ApiConfigService],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ApiConfigService],
      useFactory: (configService: ApiConfigService) => ({
        prefix: 'q',
        redis: {
          host: configService.redisConfig.host,
          port: configService.redisConfig.port,
        },
        limiter: {
          max: 10000,
          duration: 1000 * 60,
        },
        defaultJobOptions: {
          attempts: 3,
          removeOnComplete: 50,
          removeOnFail: 50,
        },
      }),
    }),
    BullModule.registerQueue({
      name: QueueJob.EXAMPLE_QUEUE_JOB,
    }),
  ],
  providers: [RedisService],
  exports: [RedisService, BullModule],
})
export class RedisModule {}
