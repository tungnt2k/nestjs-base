import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTradeHistoryIncreaseCharLength1730916099689 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE trade_history ALTER COLUMN symbol SET DATA TYPE varchar(50);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE trade_history ALTER COLUMN symbol SET DATA TYPE varchar(10);`);
  }
}
