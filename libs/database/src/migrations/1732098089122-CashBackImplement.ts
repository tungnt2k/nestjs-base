import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { DECIMAL_PRECISION, DECIMAL_SCALE } from '../constant';

export class CashBackImplement1732098089122 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cashback_history',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'feeder_fund',
            type: 'decimal',
            scale: DECIMAL_SCALE,
            precision: DECIMAL_PRECISION,
            isNullable: false,
          },
          {
            name: 'amount',
            type: 'decimal',
            scale: DECIMAL_SCALE,
            precision: DECIMAL_PRECISION,
            isNullable: false,
          },
          {
            name: 'checkpoint',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'create_time',
            type: 'bigint',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cashback_history');
  }
}
