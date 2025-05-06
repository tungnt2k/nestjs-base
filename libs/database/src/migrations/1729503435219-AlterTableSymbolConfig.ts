import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableSymbolConfig1729503435219 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('symbol_setting', [
      new TableColumn({
        name: 'is_otc',
        type: 'boolean',
        isNullable: false,
        default: false,
      }),
      new TableColumn({
        name: 'base_symbol',
        type: 'varchar',
        length: '50',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('symbol_setting', ['is_otc', 'base_symbol']);
  }
}
