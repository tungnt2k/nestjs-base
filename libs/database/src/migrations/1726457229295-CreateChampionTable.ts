import { ZERO_VALUE } from '@app/common/utils/number.util';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { DECIMAL_PRECISION, DECIMAL_SCALE } from '../constant';

export class CreateChampionTable1726457229295 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'champion_competition',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'start_time',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'end_time',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'total_prize',
            type: 'decimal',
            precision: DECIMAL_PRECISION,
            scale: DECIMAL_SCALE,
            isNullable: false,
          },
          {
            name: 'min_trade_volume',
            type: 'decimal',
            precision: DECIMAL_PRECISION,
            scale: DECIMAL_SCALE,
            isNullable: false,
            default: ZERO_VALUE,
          },
          {
            name: 'num_of_winner',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'prize',
            type: 'jsonb',
            isNullable: false,
            default: "'{}'",
          },
          {
            name: 'status',
            type: 'smallint',
            isNullable: false,
          },
          {
            name: 'create_time',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'update_time',
            type: 'bigint',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'champion_competitor',
        columns: [
          {
            name: 'champion_id',
            type: 'bigint',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'bigint',
            isPrimary: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'trade_count',
            type: 'bigint',
            isNullable: false,
            default: ZERO_VALUE,
          },
          {
            name: 'last_sync_id',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'rank',
            type: 'bigint',
            isNullable: false,
            default: ZERO_VALUE,
          },
          {
            name: 'status',
            type: 'smallint',
            isNullable: false,
          },
          {
            name: 'create_time',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'update_time',
            type: 'bigint',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('champion_competition');
    await queryRunner.dropTable('champion_competitor');
  }
}
