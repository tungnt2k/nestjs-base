import { NestExpressApplication } from '@nestjs/platform-express';
import { ApiConfigService } from 'src/core/shared/services';

export function setupCors(app: NestExpressApplication, configService: ApiConfigService) {
  app.enableCors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (!configService.domainWhitelist.includes(origin)) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';

        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
    credentials: true,
  });
}
