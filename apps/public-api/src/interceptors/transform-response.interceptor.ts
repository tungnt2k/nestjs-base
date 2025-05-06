import { BasePaginationResponse } from '@app/common/base-dto/base-pagination.response';
import { BaseResponse } from '@app/common/base-dto/base-response.dto';
import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { ClassTransformOptions } from 'class-transformer';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IResponse<T> {
  data: T;
  pagination?: any;
  links?: any;
  statusCode: number;
  message?: string;
  timestamp?: string;
}

export type IResponseParam<T> = IResponse<T> & {
  options: ClassTransformOptions;
};

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, Record<string, any>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Record<string, any>> {
    return next.handle().pipe(
      map((param: IResponseParam<T>) => {
        if (param?.pagination || param?.links) {
          return new BasePaginationResponse(
            param.data,
            param.links,
            param.pagination,
            param?.statusCode || HttpStatus.OK,
            param?.message || 'Successfully!',
          ).toPlain(param?.options);
        } else if (param?.data) {
          return new BaseResponse(
            param.data,
            param?.statusCode || HttpStatus.OK,
            param?.message || 'Successfully!',
          ).toPlain(param?.options);
        } else {
          return new BaseResponse(param, HttpStatus.OK, 'Successfully!').toPlain(param?.options);
        }
      }),
    );
  }
}
