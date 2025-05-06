import config from '@app/common/config';
import { QUEUE_JOB } from '@app/common/constants';
import { PinoLoggerModule } from '@app/pino-logger';
import { REDIS_IN_CASH_CONNECTION, RedisCoreModule, RedisModuleOptions } from '@app/redis';
import { SocketStateModule } from '@app/ws-adapter';
import { BullModule } from '@nestjs/bull';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

import { CommonModule } from './common/common.module';
import { HttpBadRequestExceptionFilter } from './filters/exception.filter';
import { AccessLogInterceptor, TransformResponseInterceptor } from './interceptors';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    ScheduleModule.forRoot(),
    MulterModule.register({
      dest: './files',
    }),
    PinoLoggerModule.forRootAsync('public_api'),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configSvc: ConfigService) => ({
        type: 'postgres',
        host: configSvc.get<string>('db.host'),
        port: configSvc.get<number>('db.port'),
        username: configSvc.get<string>('db.username'),
        password: configSvc.get<string>('db.password'),
        database: configSvc.get<string>('db.database'),
        autoLoadEntities: true,
        synchronize: false,
        logging: configSvc.get<boolean>('db.logging'),
      }),
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    RedisCoreModule.forRootAsync(
      {
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const password = configService.get<string>('redis.password');

          const redisCfg: RedisModuleOptions = {
            config: {
              host: configService.get<string>('redis.host'),
              port: configService.get<number>('redis.port'),
              db: configService.get<number>('redis.db'),
            },
          };

          if (password) redisCfg.config.password = password;

          return redisCfg;
        },
      },
      REDIS_IN_CASH_CONNECTION,
    ),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
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
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 10,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    BullModule.registerQueue({
      name: QUEUE_JOB.SNAPSHOT_PRICE_TRADE.name,
    }),
    SocketStateModule,
    CommonModule,
    JwtModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpBadRequestExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AccessLogInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class PublicApiModule {}
