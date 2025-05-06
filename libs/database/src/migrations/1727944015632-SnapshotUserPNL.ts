import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { DECIMAL_PRECISION, DECIMAL_SCALE } from '../constant';

export class SnapshotUserPNL1727944015632 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'snapshot_user_pnl',
        columns: [
          {
            name: 'user_id',
            type: 'bigint',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'time',
            type: 'bigint',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'pnl',
            type: 'decimal',
            precision: DECIMAL_PRECISION,
            scale: DECIMAL_SCALE,
            isNullable: false,
          },
          {
            name: 'total_balance',
            type: 'decimal',
            precision: DECIMAL_PRECISION,
            scale: DECIMAL_SCALE,
            isNullable: false,
          },
          {
            name: 'cumulative_pnl',
            type: 'decimal',
            precision: DECIMAL_PRECISION,
            scale: DECIMAL_SCALE,
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('snapshot_user_pnl');
  }
}
