/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-promise-executor-return */
export const delay = async (t: number) => {
  return new Promise((resolve) => setTimeout(resolve, t));
};

export const getUnixTs = () => {
  return new Date().getTime() / 1000;
};

export const timeoutPromise = <T>(prom: Promise<T>, time: number): Promise<T | null> =>
  Promise.race([prom, new Promise<T | null>((resolve, _r) => setTimeout(() => resolve(null), time))]);
