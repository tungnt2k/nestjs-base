import { ZERO_VALUE } from '@app/common/utils/number.util';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { DECIMAL_PRECISION, DECIMAL_SCALE } from '../constant';

export class AddRDM1733045699193 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rdm',
        columns: [
          {
            name: 'user_id',
            type: 'bigint',
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
            name: 'tx_id',
            type: 'bigint',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'start_balance',
            type: 'decimal',
            precision: DECIMAL_PRECISION,
            scale: DECIMAL_SCALE,
            isNullable: false,
            default: ZERO_VALUE,
          },
          {
            name: 'end_balance',
            type: 'decimal',
            precision: DECIMAL_PRECISION,
            scale: DECIMAL_SCALE,
            isNullable: false,
            default: ZERO_VALUE,
          },
          {
            name: 'lock_balance',
            type: 'decimal',
            precision: DECIMAL_PRECISION,
            scale: DECIMAL_SCALE,
            isNullable: false,
            default: ZERO_VALUE,
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
            name: 'trade_total',
            type: 'decimal',
            precision: DECIMAL_PRECISION,
            scale: DECIMAL_SCALE,
            isNullable: false,
            default: ZERO_VALUE,
          },
          {
            name: 'revenue',
            type: 'decimal',
            precision: DECIMAL_PRECISION,
            scale: DECIMAL_SCALE,
            isNullable: false,
            default: ZERO_VALUE,
          },
          {
            name: 'settlement_pnl',
            type: 'decimal',
            precision: DECIMAL_PRECISION,
            scale: DECIMAL_SCALE,
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
    await queryRunner.dropTable('rdm');
  }
}
