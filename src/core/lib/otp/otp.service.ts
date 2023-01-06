/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';

@Injectable()
export class OtpService {
  generateUniqueSecret() {
    return authenticator.generateSecret();
  }

  generateOTPCode(secret: string) {
    return authenticator.generate(secret);
  }

  generateOTPToken(email: string, serviceName: string, secret: string) {
    return authenticator.keyuri(email, serviceName, secret);
  }

  verifyOTPToken(token: string, secret: string) {
    return authenticator.verify({ token, secret });
  }

  async generateQRCode(otpAuth) {
    const QRCodeImageUrl = await toDataURL(otpAuth);
    return QRCodeImageUrl;
  }
}
