/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
export const delay = async (t: number) => new Promise((resolve) => setTimeout(resolve, t));

export const getUnixTs = () => Date.now() / 1000;

export const randomIntFromInterval = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

export const randomFromInterval = (min: number, max: number) => Math.random() * (max - min) + min;

export const isNumeric = (str: any) =>
  // @ts-ignore
  !Number.isNaN(str) && !Number.isNaN(Number.parseFloat(str));

interface RetryPromiseCallbackOptions {
  timeout?: number;
  nthTry?: number;
  callbackEveryFail?: boolean;
}

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
  } catch (error: any) {
    if (nthTry === 1 || error.message === 'Exceeding Timeout System Request Error') {
      try {
        if (callback) {
          await callback(error);
        }
      } catch {
        return Promise.reject(error);
      }

      return Promise.reject(error);
    }

    if (callbackEveryFail) {
      try {
        if (callback) {
          await callback(error);
        }
      } catch {
        return Promise.reject(error);
      }
    }

    // eslint-disable-next-line no-console
    console.log('Retrying', nthTry, 'time');

    return retryPromiseTimeoutWithCallback(promise, { timeout, nthTry: nthTry - 1, callbackEveryFail }, callback);
  }
};
