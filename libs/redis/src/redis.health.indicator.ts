import { Injectable } from '@nestjs/common';
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';

import { HEALTH_REDIS_CACHE_KEY, MISSING_CLIENT, NOT_RESPONSIVE } from './redis.constants';
import { Redis } from './redis.interfaces';

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  async checkHealth(key: string, client: Redis): Promise<HealthIndicatorResult> {
    let isHealthy = false;

    try {
      if (!client) throw new Error(MISSING_CLIENT);

      const pong = await client.ping();
      if (pong !== 'PONG') throw new Error(NOT_RESPONSIVE);

      isHealthy = true;
    } catch (error) {
      throw new HealthCheckError(error.message, this.getStatus(key, isHealthy, { message: error.message }));
    }

    return this.getStatus(key, isHealthy);
  }

  async checkHealthRedisCache(client: Redis, key: string = HEALTH_REDIS_CACHE_KEY): Promise<HealthIndicatorResult> {
    try {
      return this.checkHealth(key, client);
    } catch (e) {
      return this.getStatus(key, true, {
        message: e.message,
      });
    }
  }
}
