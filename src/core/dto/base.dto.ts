import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class PagingDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  page: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  limit: number;
}
