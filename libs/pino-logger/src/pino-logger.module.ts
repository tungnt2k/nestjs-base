import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerModule, Params, PinoLogger } from 'nestjs-pino';
import { Level } from 'pino';

import { loggerOptions } from './utils';

@Module({})
export class PinoLoggerModule {
  static forRootAsync(context?: string): DynamicModule {
    return {
      module: PinoLoggerModule,
      global: true,
      imports: [
        LoggerModule.forRootAsync({
          useFactory: (configService: ConfigService) => {
            const params: Params = {
              pinoHttp: loggerOptions(
                configService.get<string>('app.env'),
                configService.get<Level>('app.logger.log_level'),
                context,
              ),
            };
            return params;
          },
          inject: [ConfigService],
        }),
      ],
      providers: [PinoLogger],
      exports: [PinoLogger],
    };
  }
}
