import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableTradeHistoryAddDelay1728796728972 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'trade_history',
      new TableColumn({
        name: 'delay',
        type: 'bigint',
        isNullable: false,
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('trade_history', 'delay');
  }
}
