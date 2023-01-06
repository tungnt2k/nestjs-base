/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-promise-executor-return */
interface RetryPromiseCallbackOptions {
  timeout?: number;
  nthTry?: number;
  callbackEveryFail?: boolean;
}

export const retryPromise = async <T>(promise: () => Promise<T>, nthTry: number): Promise<T | never> => {
  try {
    const res = await promise();
    return res;
  } catch (e) {
    if (nthTry === 1) {
      return Promise.reject(e);
    }
    console.log('retrying', nthTry, 'time');
    return retryPromise(promise, nthTry - 1);
  }
};

export const retryPromiseTimeoutWithCallback = async <T>(
  promise: () => Promise<T>,
  options?: RetryPromiseCallbackOptions,
  callback?: (e: Error) => Promise<any>,
): Promise<T> => {
  const { timeout = 5 * 1000, nthTry = 5, callbackEveryFail = false } = options || {};

  try {
    const res = await Promise.race([
      promise(),
      new Promise<T>((_r, reject) =>
        setTimeout(() => {
          reject(new Error('Exceeding Timeout System Request Error'));
        }, timeout),
      ),
    ]);

    return res;
  } catch (e: any) {
    if (nthTry === 1 || e.message === 'Exceeding Timeout System Request Error') {
      try {
        if (callback) await callback(e);
      } catch (err) {
        return Promise.reject(e);
      }
      return Promise.reject(e);
    }

    if (callbackEveryFail) {
      try {
        if (callback) await callback(e);
      } catch (err) {
        return Promise.reject(e);
      }
    }
    console.log('Retrying', nthTry, 'time');
    return retryPromiseTimeoutWithCallback(promise, { timeout, nthTry: nthTry - 1, callbackEveryFail }, callback);
  }
};
