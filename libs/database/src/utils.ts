import { randInt } from '@app/common/utils/utils';

export const generateOrderId = (currentTime: string, accountType: number, orderType: number): string => {
  const startTime = '1701302400000'; // 1/1/2024
  const rangeTime = BigInt(currentTime) - BigInt(startTime);
  const randomNumber: number = randInt(1, 4096);

  return (
    (rangeTime << BigInt(22)) |
    (BigInt(accountType) << BigInt(18)) |
    (BigInt(orderType) << BigInt(12)) |
    (BigInt(randomNumber) << BigInt(0))
  ).toString();
};

export const generateUserId = (currentTime: string): string => {
  const startTime = '1701302400000'; // 1/1/2024
  const rangeTime = BigInt(currentTime) - BigInt(startTime);
  const randomNumber: number = randInt(1, 4194304);

  return ((rangeTime << BigInt(22)) | (BigInt(randomNumber) << BigInt(0))).toString();
};

export const randomEnum = <T>(anEnum: T): T[keyof T] => {
  const enumValues = Object.keys(anEnum)
    .map((n) => Number.parseInt(n))
    .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
};
