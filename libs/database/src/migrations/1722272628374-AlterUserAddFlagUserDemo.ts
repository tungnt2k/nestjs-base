import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserAddFlagUserDemo1722272628374 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'is_demo',
        type: 'boolean',
        default: false,
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'is_demo');
  }
}
