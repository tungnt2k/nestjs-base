import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsEnum, IsOptional, Max, Min, ValidateIf } from 'class-validator';

import { DEFAULT_PER_PAGE, MAX_PAGINATION_TAKEN, MIN_PAGINATION_TAKEN, PAGINATION_TAKEN } from '../constants';
import { SORT_TYPE } from '../enums/enum';
import { currentMilliTime } from '../utils/utils';

export class PaginationQueryDto {
  @ApiPropertyOptional({
    name: 'page',
    example: 1,
  })
  @Type(() => Number)
  @Expose({ name: 'page' })
  @IsOptional()
  @Transform(({ value }) => {
    if (!value || Number.isNaN(value)) return 1;
    return Number(value);
  })
  page?: number;

  @ApiPropertyOptional({
    name: 'limit',
    example: 10,
    description: '',
  })
  @Type(() => Number)
  @Expose({ name: 'limit' })
  @IsOptional()
  @Transform(({ value }) => {
    if (!value || Number.isNaN(value)) return DEFAULT_PER_PAGE;
    return Number(value);
  })
  limit?: number;
}

export class CommonFilter {
  @ApiPropertyOptional({
    name: 'from_date',
    example: currentMilliTime(),
    description: '',
  })
  @Type(() => String)
  @Expose({ name: 'from_date' })
  @ValidateIf((o) => o?.toDate)
  @IsOptional()
  fromDate?: string;

  @ApiPropertyOptional({
    name: 'to_date',
    example: currentMilliTime(),
    description: '',
  })
  @Type(() => String)
  @Expose({ name: 'to_date' })
  @ValidateIf((o) => o?.fromDate)
  @IsOptional()
  toDate?: string;

  @Expose({ name: 'sort_type' })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(SORT_TYPE)
  sortType?: SORT_TYPE;

  @Expose({ name: 'sort_by' })
  @IsOptional()
  sortBy?: string;
}

export class CommonFilterWithPaging extends CommonFilter {
  @ApiPropertyOptional({
    name: 'page',
    example: 1,
  })
  @Type(() => Number)
  @Expose({ name: 'page' })
  @IsOptional()
  @Transform(({ value }) => {
    if (!value || Number.isNaN(value) || Number(value) < 1) return 1;
    return Number(value);
  })
  page?: number;

  @ApiPropertyOptional({
    name: 'limit',
    example: 10,
    description: '',
  })
  @Type(() => Number)
  @Expose({ name: 'limit' })
  @IsOptional()
  @Transform(({ value }) => {
    if (!value || Number.isNaN(value) || Number(value) < 1) return DEFAULT_PER_PAGE;
    return Number(value);
  })
  limit?: number;
}

export class CommonFilterForInfLoad extends CommonFilter {
  @ApiPropertyOptional({
    name: 'take',
    example: 1,
  })
  @Type(() => Number)
  @Expose({ name: 'take' })
  @IsOptional()
  @Transform(({ value }) => {
    if (!value || Number.isNaN(value)) return PAGINATION_TAKEN;
    return Number(value);
  })
  @ValidateIf((obj) => obj?.take)
  @Min(MIN_PAGINATION_TAKEN)
  @Max(MAX_PAGINATION_TAKEN)
  take?: number;

  @ApiPropertyOptional({
    name: 'from',
    example: 10,
    description: '',
  })
  @Type(() => String)
  @Expose({ name: 'from' })
  @IsOptional()
  from?: string;
}
