import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ClassTransformOptions, Expose, instanceToPlain, Type } from 'class-transformer';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';

import { currentMilliTime } from '../utils/utils';

export class PaginationData {
  @ApiPropertyOptional()
  @Expose()
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Expose()
  @IsNumber()
  @IsOptional()
  size?: number;

  @ApiPropertyOptional()
  @Expose()
  @IsNumber()
  @IsOptional()
  total?: number;
}

export class LinkPaginationResponse {
  @ApiProperty()
  next: string;

  @ApiProperty()
  prev: string;
}

export class BasePaginationResponse<T> {
  constructor(
    data: T,
    links: LinkPaginationResponse,
    pagination: PaginationData,
    statusCode?: number,
    message?: string,
    timestamp?: string,
  ) {
    this.timestamp = !timestamp ? currentMilliTime() : timestamp;
    this.msg = message || '';
    this.data = data;
    this.statusCode = statusCode;
    this.links = links;
    this.pagination = pagination;
  }

  @Expose()
  msg?: string;

  @Expose({ name: 'status_code' })
  statusCode?: number;

  @Expose({ name: 'timestamp' })
  timestamp?: string;

  @ApiProperty()
  @Expose()
  data: T;

  @ApiProperty({ type: LinkPaginationResponse })
  @Type(() => LinkPaginationResponse)
  @Expose()
  @ValidateNested()
  links: LinkPaginationResponse;

  @ApiProperty({ type: PaginationData })
  @Type(() => PaginationData)
  @Expose()
  @ValidateNested()
  pagination: PaginationData;

  toPlain(options?: ClassTransformOptions): Record<string, any> {
    return instanceToPlain(this, options);
  }
}

// Base pagination for admin
export class BasePaginationDto<T> {
  @ApiProperty()
  data: T;

  @Expose()
  @Type(() => PaginationData)
  @ValidateNested()
  pagination: PaginationData;
}
