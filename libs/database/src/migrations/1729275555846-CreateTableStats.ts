import { ZERO_VALUE } from '@app/common/utils/number.util';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { DECIMAL_PRECISION, DECIMAL_SCALE } from '../constant';

export class CreateTableStats1729275555846 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stats',
        columns: [
          {
            name: 'key',
            type: 'varchar',
            length: '255',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'time',
            type: 'bigint',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'value',
            type: 'decimal',
            precision: DECIMAL_PRECISION,
            scale: DECIMAL_SCALE,
            isNullable: false,
            default: ZERO_VALUE,
          },
          {
            name: 'last_sync_id',
            type: 'bigint',
            isNullable: true,
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
    await queryRunner.dropTable('stats');
  }
}
