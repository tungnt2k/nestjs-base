import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ModifyLastLoginAdmin1730913025443 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('admin', ['last_login']);

    await queryRunner.addColumns('admin', [
      new TableColumn({
        name: 'last_login',
        type: 'bigint',
        isNullable: false,
        default: 0,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('admin', ['last_login']);

    await queryRunner.addColumns('admin', [
      new TableColumn({
        name: 'last_login',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
        isNullable: false,
      }),
    ]);
  }
}
