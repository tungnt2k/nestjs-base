/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { authenticator } from 'otplib';
import qrcode from 'qrcode';

export const generateOTPToken = (username: string, serviceName: string, secret: string): string => {
  return authenticator.keyuri(username, serviceName, secret);
};

export const verifyOTPToken = (token: string, secret: string): boolean => {
  return authenticator.verify({ token, secret });
};

export const generateQRCode = async (otpAuth: string) => {
  try {
    const QRCodeImageUrl = await qrcode.toDataURL(otpAuth);
    return `<img src='${QRCodeImageUrl}' alt='qr-code-img' />`;
  } catch (error) {
    return '';
  }
};
