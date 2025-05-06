import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserAddCurrency1719072333611 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'currency',
        type: 'varchar',
        isNullable: true,
        length: '10',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'currency');
  }
}
