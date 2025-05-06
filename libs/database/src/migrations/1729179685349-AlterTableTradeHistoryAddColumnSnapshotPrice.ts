import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableTradeHistoryAddColumnSnapshotPrice1729179685349 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'trade_history',
      new TableColumn({
        name: 'snapshot_price',
        type: 'jsonb',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('trade_history', 'snapshot_price');
  }
}
