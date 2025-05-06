import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { DECIMAL_PRECISION, DECIMAL_SCALE } from '../constant';

export class CreateTableAccountTransfer1728289650306 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'account_transfer',
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
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'from_type',
            type: 'smallint',
            isNullable: false,
          },
          {
            name: 'to_type',
            type: 'smallint',
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
            name: 'status',
            type: 'smallint',
            default: 1,
            isNullable: false,
          },
          {
            name: 'note',
            type: 'varchar',
            length: '255',
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
    await queryRunner.dropTable('account_transfer');
  }
}
