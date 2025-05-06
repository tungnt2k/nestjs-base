import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddDelayOrderGroup1727671675745 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'delay_trading_group',
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
            length: '100',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'delay_time',
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

    await queryRunner.createTable(
      new Table({
        name: 'delay_trading_member',
        columns: [
          {
            name: 'user_id',
            type: 'bigint',
            isPrimary: true,
          },
          {
            name: 'group_id',
            type: 'bigint',
            isPrimary: true,
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
    await queryRunner.dropTable('delay_trading_group');
    await queryRunner.dropTable('delay_trading_member');
  }
}
