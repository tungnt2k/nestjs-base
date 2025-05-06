import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication, configService: ConfigService): void {
  const path: string = configService.get<string>('swagger.path');

  if (!path) return;

  const config = new DocumentBuilder().addBearerAuth().addServer(configService.get('swagger.prefix')).build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(path, app, document);
}
