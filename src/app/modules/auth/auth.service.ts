/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import moment from 'moment';
import { Model } from 'mongoose';
import { RedisService, userVerifiedKey } from 'src/core/lib';
import { User } from 'src/core/lib/database';
import { TokenRepository, UserRepository } from 'src/core/lib/database/repositories';
import { OtpService } from 'src/core/lib/otp';
import { ApiConfigService } from 'src/core/shared/services';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';

import { TokenType } from '../../../common/enum';
import { UserService } from '../user';
import type { LoginDto, RegisterDto } from './dto';
import { AuthTokenPayload, UserRole } from './interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private apiConfigService: ApiConfigService,
    private readonly userRepos: UserRepository,
    private readonly tokenRepos: TokenRepository,
    private readonly otpService: OtpService,
    private readonly redis: RedisService,
  ) {}

  async login(params: LoginDto) {
    const user = await this.userRepos.findOne({
      email: params.email,
    });

    if (!user) {
      throw new Error('User not found!');
    }

    const verifyPass = await compare(params.password, user.password);

    if (!verifyPass) {
      throw new Error('Password is incorrect!');
    }

    const payload: AuthTokenPayload = {
      sub: user.id,
      email: user.email,
      nickname: user.nickName,
      role: UserRole.USER,
    };

    const accessToken = this.jwtService.sign(payload);

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: moment().add(this.apiConfigService.authConfig.jwtRefreshExpirationDayTime, 'days').unix(),
    });

    await this.tokenRepos.save({
      token: refreshToken,
      userId: user.id,
      type: TokenType.REFRESH_TOKEN,
      expires: moment().add(this.apiConfigService.authConfig.jwtRefreshExpirationDayTime, 'days').toDate(),
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  @Transaction()
  async register(registerData: RegisterDto, @TransactionManager() manager: EntityManager = null) {
    const existUser = await manager.getCustomRepository(UserRepository).findOne({
      email: registerData.email,
    });

    if (existUser) {
      throw new Error('User already exist!');
    }

    const existNickName = await manager.getCustomRepository(UserRepository).findOne({
      nickName: registerData.nickName,
    });

    if (existNickName) {
      throw new Error('Nick name already exist!');
    }

    const emailVerified = await this.redis.get(userVerifiedKey(registerData.email));

    const isValid = String(emailVerified) === 'true';

    if (!isValid) throw new Error('Email not verified!');

    await this.redis.del(userVerifiedKey(registerData.email));

    const hashPassword = await hash(registerData.password, 10);

    const userSecret = this.otpService.generateUniqueSecret();

    const user = await manager.getCustomRepository(UserRepository).save({
      email: registerData.email,
      nickName: registerData.nickName,
      password: hashPassword,
      secret: userSecret,
    });

    delete user.password;

    return user;
  }

  async refreshToken(refreshToken: string) {
    const tokenDecode = this.jwtService.decode(refreshToken) as { sub: number; publicAddress: string };
    const tokenResult = await this.tokenRepos.findOne({
      where: {
        token: refreshToken,
        userId: tokenDecode?.sub,
        type: TokenType.REFRESH_TOKEN,
        blacklisted: false,
      },
    });

    if (!tokenResult) {
      throw new Error('Invalid refresh token');
    }

    const user = await this.userRepos.findOne({
      where: {
        id: tokenResult.userId,
      },
    });

    if (!user) {
      throw new Error('User not found!');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      nickname: user.nickName,
      role: UserRole.USER,
    };

    const newRefreshToken = this.jwtService.sign(payload, {
      expiresIn: moment().add(this.apiConfigService.authConfig.jwtRefreshExpirationDayTime, 'days').unix(),
    });

    const newToken = this.jwtService.sign(payload);

    await this.tokenRepos.save({
      token: refreshToken,
      userId: user.id,
      type: TokenType.REFRESH_TOKEN,
      expires: moment().add(this.apiConfigService.authConfig.jwtRefreshExpirationDayTime, 'days').toDate(),
    });

    return {
      accessToken: newToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(refreshToken: string) {
    const tokenDecode = this.jwtService.decode(refreshToken) as { sub: number; publicKey: string };

    if (!tokenDecode?.sub) {
      throw new Error('Invalid refresh token');
    }

    const tokenResult = await this.tokenRepos.findOne({
      token: refreshToken,
      userId: tokenDecode.sub,
      type: TokenType.REFRESH_TOKEN,
      blacklisted: false,
    });

    if (!tokenResult) {
      throw new Error('Invalid refresh token');
    }

    await this.tokenRepos.delete({
      token: refreshToken,
      userId: tokenDecode.sub,
      type: TokenType.REFRESH_TOKEN,
      blacklisted: false,
    });

    return true;
  }
}
