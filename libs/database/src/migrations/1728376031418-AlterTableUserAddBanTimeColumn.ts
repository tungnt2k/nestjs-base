import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableUserAddBanTimeColumn1728376031418 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'ban_time',
        type: 'bigint',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'ban_time');
  }
}
