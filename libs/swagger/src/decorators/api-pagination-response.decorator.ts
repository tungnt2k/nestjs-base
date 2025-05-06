import { LinkPaginationResponse } from '@app/common/base-dto/base-pagination.response';
import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const ApiBaseResponse = <TModel extends Type<any>>(
  model: TModel,
  options?: {
    statusCode?: number;
    isArray?: boolean;
    isPaginate?: boolean;
    description?: string;
  },
) => {
  const { statusCode, isArray, isPaginate, description } = options;
  const status = statusCode ? statusCode : 200;
  const extraModels: any[] = isPaginate ? [model, LinkPaginationResponse] : [model];
  const properties: (SchemaObject | ReferenceObject)[] = isArray
    ? [
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(model) },
            },
          },
        },
      ]
    : [
        {
          properties: {
            data: { $ref: getSchemaPath(model) },
          },
        },
      ];
  if (isPaginate) {
    properties.push({
      properties: {
        links: { $ref: getSchemaPath(LinkPaginationResponse) },
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
      description,
      schema: {
        allOf: properties,
      },
    }),
  );
};
