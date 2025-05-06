export const REDIS_MODULE_CONNECTION = 'default';
export const REDIS_MODULE_CONNECTION_TOKEN = 'IORedisModuleConnectionToken';
export const REDIS_MODULE_OPTIONS_TOKEN = 'IORedisModuleOptionsToken';

export const REDIS_IN_CASH_CONNECTION = 'RedisInCashConnection';

// Redis indicator
export const MISSING_CLIENT = 'Argument`client`is missing.';
export const MISSING_TYPE = 'Argument`type` is missing.';
export const NOT_RESPONSIVE = `The client is not responsive.`;
export const ABNORMALLY_MEMORY_USAGE = `The client is using abnormally high memory.`;
export const CANNOT_BE_READ = `Info cluster cannot be read.`;
export const FAILED_CLUSTER_STATE = `Info cluster is not in OK state.`;

// redis cache
export const HEALTH_REDIS_CACHE_KEY = 'redis_cache';

// redis queue
export const HEALTH_REDIS_QUEUE_KEY = 'redis_queue';

export const DEFAULT_TTL_CACHE = 4 * 60 * 60; // 4 hours
