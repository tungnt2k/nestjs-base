import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddIconForSymbol1720515088117 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('symbol_setting', 'icon');

    await queryRunner.addColumns('symbol_setting', [
      new TableColumn({
        name: 'base_icon',
        type: 'text',
        isNullable: true,
      }),
      new TableColumn({
        name: 'quote_icon',
        type: 'text',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('symbol_setting', ['base_icon', 'quote_icon']);

    await queryRunner.addColumn(
      'symbol_setting',
      new TableColumn({
        name: 'icon',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }
}
