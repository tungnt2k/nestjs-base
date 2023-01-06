import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';

import { TokenEntity, UserEntity } from './entities';
import { TokenRepository, UserRepository } from './repositories';
import { User, UserSchema } from './schemas';

const entityPath = path.join(__dirname, 'entities/index.{js,ts}');
const migrationPath = path.join(__dirname, 'migrations/**/*.{js,ts}');

const rootDir = 'src';

const entities = [UserEntity, TokenEntity];

const repositories = [UserRepository, TokenRepository];

const schemas = [
  {
    name: User.name,
    schema: UserSchema,
  },
];

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get('MONGODB_URL'),
          useNewUrlParser: true,
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASS'),
        database: configService.get<string>('POSTGRES_DB'),
        synchronize: false,
        keepConnectionAlive: true,
        logging: configService.get<string>('NODE_ENV') === 'development',
        entities: [entityPath],
        migrations: [migrationPath],
        cli: {
          entitiesDir: `${rootDir}/core/lib/databases/entities`,
          migrationsDir: `${rootDir}/core/lib/databases/migrations`,
          seeds: ['src/core/lib/database/seeds/**/*{.ts,.js}'],
          factories: ['src/core/lib/database/factories/**/*{.ts,.js}'],
        },
      }),
    }),
    TypeOrmModule.forFeature([...entities, ...repositories]),
    MongooseModule.forFeature(schemas),
  ],
  providers: [],
  exports: [MongooseModule, TypeOrmModule],
})
export class DatabaseModule {}
