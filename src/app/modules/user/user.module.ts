import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { RedisModule } from 'src/core/lib';
import { DatabaseModule } from 'src/core/lib/database';
import { MailModule } from 'src/core/lib/mail';
import { OtpModule } from 'src/core/lib/otp';
import { ApiConfigService } from 'src/core/shared/services';

import { UserController } from './user.controller';
import { UserProcessor } from './user.processor';
import { UserService } from './user.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ApiConfigService) => ({
        secret: configService.authConfig.jwtSecret,
        signOptions: {
          expiresIn: `${configService.authConfig.jwtExpirationTime}s`,
        },
      }),
      inject: [ApiConfigService],
    }),
    DatabaseModule,
    MailModule,
    OtpModule,
    RedisModule,
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserProcessor],
  exports: [UserService],
})
export class UserModule {}
