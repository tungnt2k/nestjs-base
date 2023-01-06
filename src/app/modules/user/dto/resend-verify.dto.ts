import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

import { BaseUserDto } from './baseUser.dto';

export class ResendVerifyUserDto extends BaseUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
