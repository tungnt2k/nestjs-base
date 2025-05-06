import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { isUndefined } from 'lodash';

export class SuccessResponse {
  @ApiProperty({ name: 'success' })
  @Expose({ name: 'success' })
  @Transform(({ value }) => (isUndefined(value) ? true : value))
  success: boolean;
}
