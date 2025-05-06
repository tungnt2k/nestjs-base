import { Logger } from '@nestjs/common';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { ClassConstructor, instanceToPlain, plainToInstance } from 'class-transformer';
import { createHash } from 'crypto';
import { snakeCase } from 'lodash';
import { stringify } from 'querystring';

import { LinkPaginationResponse, PaginationData } from '../base-dto/base-pagination.response';
import { MIN_PAGINATION_TAKEN, PAGINATION_TAKEN } from '../constants';
import { NumberUtil } from './number.util';

export function currentMilliTime(): string {
  return new Date().getTime().toString();
}

export function currentTime(): string {
  return NumberUtil.divRoundDown(currentMilliTime(), '1000', 0);
}

export function calculateDurationDay(timeMilli: string) {
  const currentMilli = currentMilliTime();
  const durationMilliTime = NumberUtil.sub(currentMilli, timeMilli);
  return +NumberUtil.divRoundDown(durationMilliTime, '86400000', 0);
}

export function sleep(ms: number): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function sleepRetry(retryCount: number): Promise<unknown> {
  return sleep(1000 * retryCount * Math.pow(2, retryCount - 1));
}

export function tryStringify(value: unknown): string | undefined {
  try {
    return JSON.stringify(value);
  } catch (e) {
    Logger.error(e?.message || e);
    return undefined;
  }
}

export function pagination<T, Q>(
  data: T[],
  total: number,
  paramsQueryString: Q,
  keyGetPage: keyof Q = 'page' as keyof Q,
  keyGetLimit: keyof Q = 'limit' as keyof Q,
) {
  const pagination = {
    page: paramsQueryString[keyGetPage] ? Number(paramsQueryString[keyGetPage]) : MIN_PAGINATION_TAKEN,
    size: paramsQueryString[keyGetLimit] ? Number(paramsQueryString[keyGetLimit]) : PAGINATION_TAKEN,
    total: total || 0,
  };

  return {
    data,
    pagination,
    links: generatePaginationLinks(paramsQueryString, pagination),
  };
}

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * max) + min; // Returns a random integer from min to max
}

// check is the object or class
export function checkIsClass(record: Record<any, any>): boolean {
  return record.constructor.name !== 'Object';
}

export function transformDataForClient(
  data: Record<string, any>,
  classInstanceForClient: ClassConstructor<any>,
): Record<string, any>;
export function transformDataForClient(
  data: Record<string, any>[],
  classInstanceForClient: ClassConstructor<any>,
): Record<string, any>[];
export function transformDataForClient(
  data: Record<string, any> | Record<string, any>[],
  classInstanceForClient: ClassConstructor<any>,
): Record<string, any> | Record<string, any>[] {
  let isClass = false;
  let plainData = data;

  if (Array.isArray(data) && data.length > 0) {
    isClass = checkIsClass(data[0]);
  } else {
    isClass = checkIsClass(data);
  }

  if (isClass) {
    plainData = instanceToPlain(data, {
      strategy: 'excludeAll',
    });
  }

  const clientOrderResponse: ClassConstructor<any>[] = plainToInstance(classInstanceForClient, plainData);

  return instanceToPlain(clientOrderResponse, {
    strategy: 'excludeAll',
  });
}

export function isNumeric(str: string | number) {
  if (typeof str !== 'string' && typeof str !== 'number') return false;
  return !isNaN(+str) && !isNaN(parseFloat(String(str)));
}

export function convertKeysToSnakeCase(obj: Record<string, any>): Record<string, any> {
  const snakeObj = {};

  for (const camelKey in obj) {
    snakeObj[snakeCase(camelKey)] = obj[camelKey];
  }

  return snakeObj;
}

export function stringifyEnum(targetEnum) {
  return JSON.stringify(Object.entries(targetEnum).filter((x) => typeof x[1] === 'number'));
}

export function transformCamelToSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter, index) => {
    return index == 0 ? letter.toLowerCase() : '_' + letter.toLowerCase();
  });
}

export function generatePaginationLinks<T>(params: T, pagination: PaginationData): LinkPaginationResponse {
  const nextPage = pagination.page + 1;
  const prevPage = pagination.page - 1;

  const length = pagination.page * pagination.size;

  return {
    next: NumberUtil.lte(`${length}`, `${pagination.total}`)
      ? stringifyPaginationLink({
          ...params,
          page: nextPage,
          limit: pagination.size,
        })
      : '',
    prev:
      prevPage < 1
        ? ''
        : stringifyPaginationLink({
            ...params,
            page: prevPage,
            limit: pagination.size,
          }),
  };
}

export function stringifyPaginationLink(params: Record<string, string | boolean | number>) {
  const result: Record<string, string | boolean | number> = {};
  Object.keys(params).forEach((key) => {
    if (!isNil(params[key])) {
      result[transformCamelToSnakeCase(key)] = params[key];
    }
  });
  return stringify(result);
}

export const hashedToken = (token: string) => {
  return createHash('sha256').update(token).digest('hex');
};
