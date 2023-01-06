import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';

import { ApiConfigService, GeneratorService, ValidatorService } from './services';

const providers = [ValidatorService, GeneratorService, ApiConfigService];

@Global()
@Module({
  providers,
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  exports: [...providers, HttpModule],
})
export class SharedModule {}
