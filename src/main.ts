import {
  ClassSerializerInterceptor,
  HttpStatus,
  Logger,
  RequestMethod,
  UnprocessableEntityException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import compression from 'compression';
import { middleware as expressCtx } from 'express-ctx';
import morgan from 'morgan';

import { AppModule } from './app.module';
import { initAdapters } from './app/adapters';
import { BadRequestExceptionFilter } from './core/filters';
import { TimeoutInterceptor, TransformResponseInterceptor } from './core/interceptors';
import { SharedModule } from './core/shared';
import { ApiConfigService } from './core/shared/services';
import { setupBullBoard } from './utils/setup-bullboard';
import { setupCors } from './utils/setup-cors';
import { setupSwagger } from './utils/setup-swagger';

export async function bootstrap(): Promise<NestExpressApplication> {
  const logger = new Logger('Main');

  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());

  app.useLogger(logger);

  const configService = app.select(SharedModule).get(ApiConfigService);

  app.enable('trust proxy');

  setupCors(app, configService);

  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  app.use(compression());

  app.use(morgan('combined'));

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  const reflector = app.get(Reflector);

  // -----------Global filter-------------
  app.useGlobalFilters(new BadRequestExceptionFilter(reflector));
  // -------------------------------------------

  // -----------Global filter-------------
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  // -------------------------------------------

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      skipMissingProperties: false,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    }),
  );

  // -----------Setup Swagger-------------
  if (configService.documentationEnabled) {
    setupSwagger(app);
  }

  // -----------Setup Bull Board UI-------------
  if (configService.bullBoardEnabled) {
    setupBullBoard;
  }
  // ------------------------------------------

  app.use(expressCtx);

  // Starts listening for shutdown hooks
  if (!configService.isDevelopment) {
    app.enableShutdownHooks();
  }

  // -----------Setup Redis Adapter-------------
  await initAdapters(app);

  const port = configService.appConfig.port;

  await app.listen(port);

  logger.log(`Server start at http://localhost:${port}`);

  return app;
}

void bootstrap();
