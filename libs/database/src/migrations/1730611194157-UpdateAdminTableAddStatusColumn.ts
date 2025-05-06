import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateAdminTableAddStatusColumn1730611194157 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'admin',
      new TableColumn({
        name: 'status',
        type: 'smallint',
        default: 1,
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('admin', 'status');
  }
}
