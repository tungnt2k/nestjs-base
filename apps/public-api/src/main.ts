import { ENVIRONMENT } from '@app/common/enums/enum';
import { initAdapters } from '@app/ws-adapter';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'body-parser';
import { initializeTransactionalContext, StorageDriver } from 'typeorm-transactional';

import { PublicApiModule } from './public-api.module';

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  const app = await NestFactory.create(PublicApiModule);

  const configService = app.get(ConfigService);

  app.use(json({ limit: '50mb' }));
  app.enableCors();

  if (configService.get('app.env') !== ENVIRONMENT.PRODUCTION) {
    const config = new DocumentBuilder()
      .setTitle('API')
      .setDescription('The API description')
      .setVersion('1.0')
      .addBearerAuth()
      .addServer(configService.get('swagger.server'))
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document);
  }

  await initAdapters(app);

  const port = configService.get('app.api.port');
  await app.listen(port);

  console.log(`Server listen at: ${port}`);
}
bootstrap();
