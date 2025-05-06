import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { DECIMAL_PRECISION, DECIMAL_SCALE } from '../constant';

export class DropCommissionHistoryTable1733512316190 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS commission_history_child_id_parent_id_idx;`);
    await queryRunner.query(`DROP INDEX IF EXISTS commission_history_create_time_idx`);

    await queryRunner.dropTable('commission_history');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'commission_history',
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
            name: 'revenue_value',
            type: 'decimal',
            precision: DECIMAL_PRECISION,
            scale: DECIMAL_SCALE,
            isNullable: false,
          },
          {
            name: 'commission_value',
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
            name: 'status',
            type: 'smallint',
            isNullable: false,
          },
          {
            name: 'ref_id',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'ref_type',
            type: 'smallint',
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

    await queryRunner.query(
      `CREATE INDEX commission_history_child_id_parent_id_idx ON commission_history (child_id, parent_id);`,
    );
    await queryRunner.query(`CREATE INDEX commission_history_create_time_idx ON commission_history (create_time);`);
  }
}
