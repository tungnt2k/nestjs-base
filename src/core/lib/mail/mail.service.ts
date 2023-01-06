import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ApiConfigService } from 'src/core/shared/services';

import { UserEntity } from '../database';

@Injectable()
export class MailService {
  private systemImage: string;

  private serviceName: string;

  constructor(private mailerService: MailerService, private configService: ApiConfigService) {
    this.systemImage = `${this.configService.appConfig.clientUrl}/sample.png`;
    this.serviceName = this.configService.appConfig.appName;
  }

  async sendUserConfirmation(email: string, token: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: `Welcome to 【${this.serviceName}】 Activate your account`,
      template: 'signup',
      context: {
        token,
        email,
        serviceName: this.configService,
        systemImage: this.systemImage,
      },
    });
  }

  async sendUserResetPassword(user: UserEntity, token: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: `You had requested to reset your password on【${this.serviceName}】`,
      template: 'resetpassword',
      context: {
        token,
        email: user.email,
        nickname: user.nickName,
        serviceName: this.serviceName,
        systemImage: this.systemImage,
      },
    });
  }
}
