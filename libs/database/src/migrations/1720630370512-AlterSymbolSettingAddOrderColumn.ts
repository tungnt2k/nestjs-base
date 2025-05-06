import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterSymbolSettingAddOrderColumn1720630370512 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'symbol_setting',
      new TableColumn({
        name: 'order',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'faq',
      new TableColumn({
        name: 'order',
        type: 'int',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('symbol_setting', 'order');

    await queryRunner.dropColumn('faq', 'order');
  }
}
