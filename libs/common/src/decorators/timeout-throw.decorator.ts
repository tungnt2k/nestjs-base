import { TimeoutError } from '../exceptions/timeout.exception';

export function TimeoutThrow(timeout: number = 30000) {
  return function (target: any, name: any, descriptor: TypedPropertyDescriptor<any>) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: Array<unknown>) {
      const logger = this.logger;

      const printLog = () => {
        if (logger) {
          logger.warn({ ...args }, `Function ${name}() timeout`);
        }
      };

      const timeoutPromise = new Promise((_resolve, reject) => {
        setTimeout(() => {
          printLog();
          reject(new TimeoutError());
        }, timeout);
      });

      const result = Promise.race([originalMethod.apply(this, args), timeoutPromise]);

      if ('then' in result === false) {
        return result;
      }

      return result
        .then((value) => {
          return value;
        })
        .catch((err) => {
          throw err;
        });
    };
  };
}
