export default () => ({
  app: {
    env: process.env.APP_ENV || 'DEV',
    api: {
      port: +process.env.HTTP_PORT || 3000,
    },
    admin: {
      port: +process.env.ADMIN_HTTP_PORT || 3006,
    },
    logger: {
      log_level: process.env.LOG_LEVEL,
    },
    clientUrl: process.env.CLIENT_URL,
    serverUrl: process.env.SERVER_URL,
    systemImage: process.env.SYSTEM_IMAGE,
  },
  swagger: {
    server: process.env.SWAGGER_SERVER,
  },
  auth: {
    keySignToken: 'q9muatrixxv323wpqjxmsmut8glonacxxnxw6akog8xggu5p3j',
    keySignRefreshToken: '6z9sbe57k79rz944paxkra2w7qde5uty722g2e6bui68upznzh',
    saltRounds: 10,
    expireLoginToken: 3600, // 1 hour
    expireRefreshToken: 604800, // 1 week
    expireRefreshTokenRemember: 2592000, // 1 month
  },
  db: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DB,
    logging: Boolean(process.env.POSTGRES_LOG),
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    db: process.env.REDIS_CACHE_DB || 1,
    password: process.env.REDIS_PASS,
    queue: process.env.REDIS_QUEUE_DB || 2,
  },
  serviceName: 'API',
});
