import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableTradeHistory1717519606995 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('trade_history', ['created_at', 'updated_at']);
    await queryRunner.addColumns('trade_history', [
      new TableColumn({
        name: 'open_time',
        type: 'bigint',
        isNullable: false,
        default: 0,
      }),
      new TableColumn({
        name: 'update_time',
        type: 'bigint',
        isNullable: false,
        default: 0,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('trade_history', ['open_time', 'update_time']);

    await queryRunner.addColumns('trade_history', [
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
        isNullable: false,
      }),
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
        isNullable: false,
      }),
    ]);
  }
}
