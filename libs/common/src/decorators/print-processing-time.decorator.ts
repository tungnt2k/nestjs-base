export function PrintProcessingTime(target: any, name: any, descriptor: TypedPropertyDescriptor<any>) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: Array<unknown>) {
    const logger = this.logger;
    if (!logger) {
      return originalMethod.apply(this, args);
    }

    const now = Date.now();
    const result = originalMethod.apply(this, args);

    const printLog = (msg = `Processing time ${name}`): void => {
      logger.info({ ...args, processingTime: `${Date.now() - now} ms` }, msg);
    };

    if ('then' in result === false) {
      printLog();
      return result;
    }

    return result
      .then((value) => {
        printLog();
        return value;
      })
      .catch((err) => {
        printLog();
        throw err;
      });
  };
}
