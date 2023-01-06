export const IORedisKey = 'IORedis';

export const userOnlineKey = (userId: number) => `UserOnline:${userId}`;

export const userVerifiedKey = (email: string) => `UserVerified:${email}`;

export const userVerifiedTokenKey = (email: string) => `UserVerifiedToken:${email}`;

export const userResetPassTokenKey = (email: string) => `UserResetPassToken:${email}`;

export const userResetPassKey = (email: string) => `UserResetPass:${email}`;

export const genTxDepositStakeNeedSign = (userId: number, depositId: number) =>
  `DepositStakeNeedSign:${userId}:${depositId}`;
