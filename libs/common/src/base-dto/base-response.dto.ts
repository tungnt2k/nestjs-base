import { ClassTransformOptions, Expose, instanceToPlain } from 'class-transformer';

import { currentMilliTime } from '../utils/utils';

export class BaseResponse<T> {
  @Expose()
  data: T;

  @Expose()
  msg: string;

  @Expose({ name: 'status_code' })
  statusCode: number;

  @Expose({ name: 'timestamp' })
  timestamp: string;

  constructor(data: T, statusCode: number, message?: string, timestamp?: string) {
    this.timestamp = !timestamp ? currentMilliTime() : timestamp;
    this.msg = message || '';
    this.data = data;
    this.statusCode = statusCode;
  }

  toPlain(options?: ClassTransformOptions): Record<string, any> {
    return instanceToPlain(this, options);
  }
}
