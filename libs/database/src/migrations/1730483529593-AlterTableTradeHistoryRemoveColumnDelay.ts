import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableTradeHistoryRemoveColumnDelay1730483529593 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('trade_history', 'delay');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'trade_history',
      new TableColumn({
        name: 'delay',
        type: 'bigint',
        isNullable: true,
      }),
    );
  }
}
