import { DECIMAL_PRECISION, DECIMAL_SCALE } from '@app/database/constant';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTradeHistoryTable1717438394351 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'trade_history',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'symbol',
            type: 'varchar',
            length: '10',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'smallint',
            isNullable: false,
          },
          {
            name: 'account_type',
            type: 'smallint',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'smallint',
            isNullable: false,
          },
          {
            name: 'result',
            type: 'smallint',
            isNullable: false,
            default: 0,
          },
          {
            name: 'open_price',
            type: 'decimal',
            precision: DECIMAL_PRECISION,
            scale: DECIMAL_SCALE,
            isNullable: false,
          },
          {
            name: 'close_price',
            type: 'decimal',
            precision: DECIMAL_PRECISION,
            scale: DECIMAL_SCALE,
            isNullable: true,
          },
          {
            name: 'close_time',
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
            name: 'after_balance',
            type: 'decimal',
            precision: DECIMAL_PRECISION,
            scale: DECIMAL_SCALE,
            isNullable: false,
          },
          {
            name: 'profit',
            type: 'decimal',
            precision: DECIMAL_PRECISION,
            scale: DECIMAL_SCALE,
            isNullable: false,
            default: 0,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.query(`
        CREATE INDEX trade_history_created_at_idx ON public.trade_history USING btree (created_at DESC);
    `);

    await queryRunner.query(`
        CREATE INDEX trade_history_end_time_idx ON public.trade_history USING btree (close_time DESC);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('trade_history');
  }
}
