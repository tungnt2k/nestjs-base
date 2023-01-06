import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { ApiConfigService } from 'src/core/shared/services';

import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ApiConfigService],
      useFactory: (configService: ApiConfigService) => ({
        transport: {
          host: configService.mailConfig.host,
          port: configService.mailConfig.port,
          secure: true,
          auth: {
            user: configService.mailConfig.user,
            pass: configService.mailConfig.pass,
          },
        },
        defaults: {
          from: `"No Reply" ${configService.mailConfig.from}`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      imports: [ApiConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
