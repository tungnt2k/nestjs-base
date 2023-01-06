import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const entityPath = path.join(__dirname, 'src/core/lib/database/entities/**/*.entity.ts');
const migrationPath = path.join(__dirname, 'src/core/lib/database/migrations/*.ts');

module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [entityPath],
  migrations: [migrationPath],
  cli: {
    entitiesDir: 'src/core/lib/database/entities',
    migrationsDir: 'src/core/lib/database/migrations',
    seeds: ['src/core/lib/database/seeds/**/*{.ts,.js}'],
    factories: ['src/core/lib/database/factories/**/*{.ts,.js}'],
  },
  seeds: ['src/core/lib/database/seeds/**/*{.ts,.js}'],
};
