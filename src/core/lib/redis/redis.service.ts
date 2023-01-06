/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

import { IORedisKey, userOnlineKey } from './redis.enum';

@Injectable()
export class RedisService {
  constructor(@Inject(IORedisKey) private readonly redisClient: Redis) {}

  async get(key: string) {
    const result = await this.redisClient.get(key);

    return result;
  }

  async set(key: string, value: any, ttl?: number) {
    await this.redisClient.set(key, value);

    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }

  async del(key: string) {
    await this.redisClient.del(key);
  }

  async setUserOnline(userId: number, socketId: string) {
    await this.redisClient.sadd(userOnlineKey(userId), socketId);

    return true;
  }

  async checkUserOnline(userId: number) {
    const result = await this.redisClient.exists(userOnlineKey(userId));

    return Boolean(result);
  }

  async removeUserOnl(userId: number, socketId: string) {
    await this.redisClient.srem(userOnlineKey(userId), socketId);

    const sockets = await this.redisClient.smembers(userOnlineKey(userId));

    if (sockets.length === 0) {
      await this.redisClient.del(userOnlineKey(userId));
    }

    return true;
  }

  async getUserSocketIds(userId: number) {
    const sockets = await this.redisClient.smembers(userOnlineKey(userId));

    return sockets;
  }

  async getUserOnline(): Promise<number[]> {
    const keys = await this.redisClient.keys('UserOnline:*');

    const result: number[] = [];

    for (const key of keys) {
      try {
        const userId = key.split(':')[1];
        result.push(Number(userId));
      } catch {
        continue;
      }
    }

    return result;
  }

  getClient() {
    return this.redisClient;
  }
}
