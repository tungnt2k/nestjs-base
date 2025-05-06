import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

import { DECIMAL_PRECISION, DECIMAL_SCALE } from '../constant';

export class CreateTableCommissionSettlementHistory1728895798253 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('commission_history', [
      new TableColumn({
        name: 'ref_id',
        type: 'bigint',
        isNullable: true,
      }),
      new TableColumn({
        name: 'ref_type',
        type: 'smallint',
        isNullable: true,
      }),
    ]);

    await queryRunner.createTable(
      new Table({
        name: 'commission_settlement_history',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'child_id',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'parent_id',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'amount',
            type: 'decimal',
            precision: DECIMAL_PRECISION,
            scale: DECIMAL_SCALE,
            isNullable: false,
          },
          {
            name: 'type',
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
    await queryRunner.dropColumns('commission_history', ['ref_id', 'ref_type']);

    await queryRunner.dropTable('commission_settlement_history');
  }
}
