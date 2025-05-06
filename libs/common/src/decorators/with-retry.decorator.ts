import { sleep } from '../utils/utils';

export interface IAsyncRetryOptions {
  retryCount?: number;
  sleepTime?: number;
  retryCondition?: (error: any) => boolean;
}

const defaultOptions: IAsyncRetryOptions = {
  retryCount: 3,
  sleepTime: 1000,
};

export function WithAsyncRetry(options: IAsyncRetryOptions) {
  return function (target: any, name: any, descriptor: TypedPropertyDescriptor<any>) {
    const originalMethod = descriptor.value;

    const retryCount = options.retryCount || defaultOptions.retryCount;
    const sleepTime = options.sleepTime || defaultOptions.sleepTime;

    descriptor.value = async function (...args) {
      for (let i = 1; i <= retryCount; i++) {
        try {
          const result = await originalMethod.apply(this, args);
          return result;
        } catch (error) {
          if (i === retryCount) {
            throw error;
          }

          if (options?.retryCondition && !options.retryCondition(error)) {
            throw error;
          }

          sleep(sleepTime);
        }
      }
    };

    return descriptor;
  };
}
