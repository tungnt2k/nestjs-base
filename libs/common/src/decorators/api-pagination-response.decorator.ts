import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

import { LinkPaginationResponse, PaginationData } from '../base-dto/base-pagination.response';

export const ApiBaseResponse = <TModel extends Type<any>>(
  model: TModel,
  options?: {
    statusCode?: number;
    isArray?: boolean;
    isPaginate?: boolean;
    description?: string;
    isPaginationData?: boolean;
  },
) => {
  let status = 200;
  const extraModels: any[] = [model];
  let properties: (SchemaObject | ReferenceObject)[] = [
    {
      properties: {
        data: { $ref: getSchemaPath(model) },
      },
    },
  ];
  if (options?.statusCode) {
    status = options.statusCode;
  }
  if (options?.isPaginate) {
    extraModels.push(LinkPaginationResponse);
    properties.push({
      properties: {
        links: { $ref: getSchemaPath(LinkPaginationResponse) },
      },
    });
  }
  if (options?.isArray) {
    properties = [
      ...properties,
      {
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(model) },
          },
        },
      },
    ];
  }
  if (options?.isPaginationData) {
    extraModels.push(PaginationData);
    properties.push({
      properties: {
        pagination: { $ref: getSchemaPath(PaginationData) },
      },
    });
  }
  properties.push({
    properties: {
      status_code: {
        type: 'number',
        example: 200,
      },
      msg: {
        type: 'string',
        example: 'Success',
      },
      timestamp: {
        type: 'string',
        example: '123124123123',
      },
    },
  });
  return applyDecorators(
    ApiExtraModels(...extraModels),
    ApiResponse({
      status,
      description: options?.description || '',
      schema: {
        allOf: properties,
      },
    }),
  );
};
