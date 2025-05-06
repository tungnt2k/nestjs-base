import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_DB,
  logging: Boolean(process.env.POSTGRES_LOG || 0),
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: ['libs/database/src/migrations/**/*{.ts,.js}'],
  entities: ['*.entity{.ts,.js}'],
});
