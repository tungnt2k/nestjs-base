import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import * as IORedis from 'ioredis';

export type Redis = IORedis.Redis;

export interface RedisModuleOptions {
  config: IORedis.RedisOptions & { url?: string };
}

export interface RedisModuleOptionsFactory {
  createRedisModuleOptions(): Promise<RedisModuleOptions> | RedisModuleOptions;
}

export interface RedisModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<RedisModuleOptionsFactory>;
  useExisting?: Type<RedisModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<RedisModuleOptions> | RedisModuleOptions;
}
