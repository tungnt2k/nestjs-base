import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { BaseUserDto } from './baseUser.dto';

export class VerifyUserDto extends BaseUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  verifyToken: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
