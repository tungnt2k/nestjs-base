import { DECIMAL_PRECISION, DECIMAL_SCALE } from '@app/database/constant';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSignalNavigator1729872541680 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'signal_navigator',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'symbol_id',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'trigger_price',
            type: 'decimal',
            precision: DECIMAL_PRECISION,
            scale: DECIMAL_SCALE,
            isNullable: false,
          },
          {
            name: 'trigger_time',
            type: 'bigint',
            isNullable: false,
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
    await queryRunner.dropTable('signal_navigator');
  }
}
