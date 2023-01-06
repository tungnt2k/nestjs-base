import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { BaseUserDto } from './baseUser.dto';

export class VerifyResetPassUserDto extends BaseUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  verifyToken: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
