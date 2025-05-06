import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNumber, IsNumberString, IsOptional, Max, Min } from 'class-validator';

import { MAX_PAGINATION_TAKEN, MIN_PAGINATION_TAKEN, PAGINATION_TAKEN } from '../constants';

export interface IBaseLoadMore {
  from?: string;

  to?: string;

  take?: number;
}

export class BaseLoadMoreDto implements IBaseLoadMore {
  @ApiPropertyOptional({ name: 'from', description: 'id' })
  @Expose({ name: 'from' })
  @IsNumberString()
  @IsOptional()
  from?: string;

  @ApiPropertyOptional({ name: 'to', description: 'id' })
  @Expose({ name: 'to' })
  @IsNumberString()
  @IsOptional()
  to?: string;

  @ApiProperty({
    name: 'take',
    example: `${PAGINATION_TAKEN}`,
    description: `Default is ${PAGINATION_TAKEN}. For pagination`,
  })
  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Max(MAX_PAGINATION_TAKEN)
  @Min(MIN_PAGINATION_TAKEN)
  take?: number = PAGINATION_TAKEN;
}
