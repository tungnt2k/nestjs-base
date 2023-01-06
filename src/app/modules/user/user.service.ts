/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import BN from 'bignumber.js';
import { Job } from 'bull';
import { randomBytes } from 'crypto';
import { compact, difference, range } from 'lodash';
import moment from 'moment';
import { Model, PipelineStage } from 'mongoose';
import {
  LoggerService,
  RedisService,
  userResetPassTokenKey,
  userVerifiedKey,
  userVerifiedTokenKey,
} from 'src/core/lib';
import { User, UserEntity } from 'src/core/lib/database';
import { UserRepository } from 'src/core/lib/database/repositories';
import { MailService } from 'src/core/lib/mail';
import { OtpService } from 'src/core/lib/otp';
import { ApiConfigService } from 'src/core/shared/services';
import { EntityManager, In, MoreThanOrEqual, Transaction, TransactionManager } from 'typeorm';

import { NotifyReceiverType, NotifyResourceType, NotifyType } from '../../../common/enum';
import type {
  ChangePasswordUserDto,
  ResendVerifyUserDto,
  ResetPassUserDto,
  UpdateUserDto,
  VerifyResetPassUserDto,
  VerifyUserDto,
} from './dto';
import { CheckResetPasswordDto } from './dto';
import { BinaryChildType } from './enum';
import { IDailyBinaryCommission } from './interface';

@Injectable()
export class UserService {
  private readonly logger = new LoggerService(UserService.name);

  constructor(
    private readonly configService: ApiConfigService,
    private readonly userRepos: UserRepository,
    private readonly mailService: MailService,
    private readonly otpService: OtpService,
    private readonly redis: RedisService,
    private readonly jwtService: JwtService,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async getUserProfile(id: number) {
    const user = await this.userRepos.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    delete user.password;

    return user;
  }

  async findOne(id: number) {
    return this.userRepos.findOne(id);
  }

  async updateUser(user: { id: number }, updateData: UpdateUserDto) {
    const userData = await this.userRepos.findOne({
      id: user.id,
    });

    if (!userData) {
      throw new Error('User not found');
    }

    return this.userRepos.save({ id: user.id, ...updateData });
  }

  @Transaction()
  async changePassword(
    userId: number,
    data: ChangePasswordUserDto,
    @TransactionManager() manager: EntityManager = null,
  ) {
    const existUser = await manager.getCustomRepository(UserRepository).getUserById(userId);

    if (!existUser) {
      throw new Error('User not found');
    }

    const verifyPass = await compare(data.oldPassword, existUser.password);

    if (!verifyPass) {
      throw new Error('Old password is incorrect');
    }

    const samePass = await compare(data.password, existUser.password);

    if (samePass) {
      throw new Error('New password must be different from old password');
    }

    const hashPass = await hash(data.password, 10);

    await manager.getCustomRepository(UserRepository).updateUser(existUser, { password: hashPass });

    return true;
  }

  @Transaction()
  async resendVerifyEmail(data: ResendVerifyUserDto, @TransactionManager() manager: EntityManager = null) {
    const existUser = await manager.getCustomRepository(UserRepository).getUserByEmail(data.email);

    if (existUser) {
      throw new Error('User already exists');
    }

    const secret = this.otpService.generateUniqueSecret();

    const token = this.otpService.generateOTPCode(secret);

    await this.redis.set(
      userVerifiedTokenKey(data.email),
      token,
      this.configService.authConfig.verifyEmailTokenExpirationTime,
    );

    await this.mailService.sendUserConfirmation(data.email, token);

    return true;
  }

  @Transaction()
  async verifyEmail(data: VerifyUserDto, @TransactionManager() manager: EntityManager = null) {
    const user = await manager.getCustomRepository(UserRepository).getUserByEmail(data.email);

    if (user) throw new Error('User already exists');

    const tokenCached = await this.redis.get(userVerifiedTokenKey(data.email));

    const isValid = String(data.verifyToken) === String(tokenCached);

    if (!isValid) throw new Error('Invalid token');

    await this.redis.del(userVerifiedTokenKey(data.email));

    await this.redis.set(
      userVerifiedKey(data.email),
      'true',
      this.configService.authConfig.verifyEmailTokenExpirationTime,
    );

    return true;
  }

  @Transaction()
  async reqVerifyEmail(email: string, @TransactionManager() manager: EntityManager = null) {
    const existUser = await manager.getCustomRepository(UserRepository).getUserByEmail(email);

    if (existUser) {
      throw new Error('User already exists');
    }

    const secret = this.otpService.generateUniqueSecret();

    const token = this.otpService.generateOTPCode(secret);

    await this.redis.set(
      userVerifiedTokenKey(email),
      token,
      this.configService.authConfig.verifyEmailTokenExpirationTime,
    );

    await this.mailService.sendUserConfirmation(email, token);

    return true;
  }

  @Transaction()
  async resetPass(data: ResetPassUserDto, @TransactionManager() manager: EntityManager = null) {
    const user = await manager.getCustomRepository(UserRepository).getUserByEmail(data.email);

    if (!user) {
      throw new Error('User not found');
    }

    const secret = this.otpService.generateUniqueSecret();

    const token = this.otpService.generateOTPCode(secret);

    await this.redis.set(
      userResetPassTokenKey(user.email),
      token,
      this.configService.authConfig.verifyEmailTokenExpirationTime,
    );

    await this.mailService.sendUserResetPassword(user, token);

    return true;
  }

  @Transaction()
  async checkResetPassword(data: CheckResetPasswordDto, @TransactionManager() manager: EntityManager = null) {
    const existUser = await manager.getCustomRepository(UserRepository).getUserByEmail(data.email);
    if (!existUser) {
      throw new Error('User not found');
    }
    const tokenCached = await this.redis.get(userResetPassTokenKey(data.email));

    const isValid = String(data.otpCode) === String(tokenCached);

    if (!isValid) throw new Error('Invalid token');
    await this.redis.del(userVerifiedTokenKey(data.email));

    const payload = {
      sub: existUser.id,
      email: existUser.email,
    };

    const token = this.jwtService.sign(payload);
    return {
      token,
    };
  }

  @Transaction()
  async verifyResetPassword(data: VerifyResetPassUserDto, @TransactionManager() manager: EntityManager = null) {
    const existUser = await manager.getCustomRepository(UserRepository).getUserByEmail(data.email);
    if (!existUser) {
      throw new Error('User not found');
    }

    let payload: any;
    try {
      payload = await this.jwtService.verify(data.verifyToken);
    } catch (err) {
      throw new Error('User Credentials not valid');
    }

    if (Number(payload.sub) !== Number(existUser.id)) throw new Error('User Credentials not valid');

    const pass = await hash(data.password, 10);

    await manager.getCustomRepository(UserRepository).updateUser(existUser, { password: pass });

    return true;
  }
}
