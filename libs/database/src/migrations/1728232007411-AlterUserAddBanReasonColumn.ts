import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserAddBanReasonColumn1728232007411 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'ban_reason',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'ban_reason');
  }
}
