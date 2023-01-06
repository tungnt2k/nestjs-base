import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignSignatureDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  publicKey: string;
}
