import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableUserAddLevelColumn1728443804116 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'level',
        type: 'smallint',
        isNullable: false,
        default: 1,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'level');
  }
}
