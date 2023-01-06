import { Body, Controller, Get, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/core/guards';

import {
  ChangePasswordUserDto,
  ResendVerifyUserDto,
  ResetPassUserDto,
  UpdateUserDto,
  VerifyResetPassUserDto,
  VerifyUserDto,
} from './dto';
import { CheckResetPasswordDto } from './dto/check-reset-password.dto';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: Request) {
    const user = req.user;
    const result = await this.userService.getUserProfile(user.id);

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/')
  async updateProfile(@Body() updateData: UpdateUserDto, @Req() req: Request) {
    const result = await this.userService.updateUser(req.user, updateData);

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('password')
  async changePassword(@Req() req: Request, @Body() changePass: ChangePasswordUserDto) {
    const result = await this.userService.changePassword(req.user.id, changePass);

    return result;
  }

  @Post('verify/resend-email')
  async resendEmailVerify(@Body() resendVerifyUserDto: ResendVerifyUserDto) {
    const result = await this.userService.resendVerifyEmail(resendVerifyUserDto);

    return result;
  }

  @Get('verify')
  async reqVerify(@Query('email') email: string) {
    console.log(email, 'aaa');
    const result = await this.userService.reqVerifyEmail(email);

    return result;
  }

  @Post('verify')
  async verify(@Body() verifyUserDto: VerifyUserDto) {
    const result = await this.userService.verifyEmail(verifyUserDto);

    return result;
  }

  @Post('reset-pass')
  async requestResetPass(@Body() resetPassDto: ResetPassUserDto) {
    const result = await this.userService.resetPass(resetPassDto);

    return result;
  }

  @Post('verify-otp-reset-pass')
  async verifyOTPResetPass(@Body() verifyOTPResetPassDto: CheckResetPasswordDto) {
    const result = await this.userService.checkResetPassword(verifyOTPResetPassDto);
    return result;
  }

  @Post('verify-reset-pass')
  async verifyResetPass(@Body() verifyResetPassDto: VerifyResetPassUserDto) {
    const result = await this.userService.verifyResetPassword(verifyResetPassDto);
    return result;
  }
}
