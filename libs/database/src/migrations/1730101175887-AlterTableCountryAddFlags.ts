import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableCountryAddFlags1730101175887 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'country',
      new TableColumn({
        name: 'icon',
        type: 'text',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('country', 'icon');
  }
}
