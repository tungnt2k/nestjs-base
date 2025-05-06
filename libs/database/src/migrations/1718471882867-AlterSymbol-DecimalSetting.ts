import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterSymbolDecimalSetting1718471882867 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'symbol_setting',
      new TableColumn({
        name: 'decimal',
        type: 'int',
        default: '0',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('symbol_setting', 'decimal');
  }
}
