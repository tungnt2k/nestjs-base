import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import moment from 'moment';
import { ApiConfigService } from 'src/core/shared/services';

import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly configService: ApiConfigService) {}

  @Post('sign-in')
  async login(@Body() loginData: LoginDto, @Req() req: Request) {
    const result = await this.authService.login(loginData);

    const expiresTime = loginData?.remember
      ? this.configService.authConfig.jwtRefreshExpirationDayTime * this.configService.timeConst.oneDayInMillisecond
      : this.configService.timeConst.oneDayInMillisecond;

    req.session.refreshToken = result.refreshToken;

    req.session.cookie.originalMaxAge = expiresTime;
    req.session.cookie.maxAge = expiresTime;
    req.session.save();

    return { accessToken: result.accessToken };
  }

  @Post('refresh-token')
  async refreshToken(@Req() req: Request) {
    const { refreshToken = '' } = req.session;
    const authToken = await this.authService.refreshToken(refreshToken);
    req.session.refreshToken = refreshToken;
    const { cookie } = req.session;
    cookie.expires = moment().add(cookie.originalMaxAge, 'milliseconds').toDate();
    req.session.save();

    return {
      accessToken: authToken.accessToken,
    };
  }

  @Post('logout')
  async logout(@Req() req: Request) {
    const { refreshToken = '' } = req.session;
    req.session.destroy((err) => {
      if (err) {
        throw err;
      }
    });

    await this.authService.logout(refreshToken);

    return true;
  }

  @Post('signup')
  async register(@Body() registerData: RegisterDto) {
    const result = await this.authService.register(registerData);

    return result;
  }
}
