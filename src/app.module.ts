import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import RedisStore from 'connect-redis';
import session from 'express-session';
import { join, resolve } from 'path';
import { createClient } from 'redis';
import { DatabaseModule } from 'src/core/lib/database';
import { v4 as uuidV4 } from 'uuid';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketStateModule } from './app/adapters';
import { EventsModule } from './app/events/events.module';
import { AuthModule, HealthCheckerModule, TaskModule, UserModule } from './app/modules';
import { AllExceptionFilter } from './core/filters';
import { LoggerModule, RedisModule } from './core/lib';
import { SharedModule } from './core/shared';
import { ApiConfigService } from './core/shared/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot(
      (() => {
        const publicDir = resolve('./upload/');
        const servePath = '/files';

        return {
          rootPath: publicDir,
          // serveRoot - if you want to see files on another controller,
          // e.g.: http://localhost:8088/files/1.png
          serveRoot: servePath,
          exclude: ['/api*'],
          index: false,
        };
      })(),
    ),
    ScheduleModule.forRoot(),
    DatabaseModule,
    HealthCheckerModule,
    SharedModule,
    LoggerModule,
    RedisModule,
    AuthModule,
    UserModule,
    SocketStateModule,
    TaskModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private configService: ApiConfigService) {}

  async configure(consumer: MiddlewareConsumer) {
    const client = createClient({
      url: this.configService.redisConfig.url,
      legacyMode: true,
    });

    await client.connect();

    const RedisStoreSession = RedisStore(session);

    consumer
      .apply(
        session({
          store: new RedisStoreSession({
            client,
            logErrors: true,
          }) as any,
          genid: () => uuidV4(),
          saveUninitialized: true,
          secret: this.configService.authConfig.sessionSecret,
          resave: false,
          cookie: {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            secure: this.configService.nodeEnv !== 'development',
            sameSite: this.configService.nodeEnv !== 'development' ? 'none' : false,
          },
        }),
      )
      .forRoutes('*');
  }
}
