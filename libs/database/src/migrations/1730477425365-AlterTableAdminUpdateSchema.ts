import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableAdminUpdateSchema1730477425365 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('admin', [
      new TableColumn({
        name: 'create_time',
        type: 'bigint',
        isNullable: false,
        default: 0,
      }),
      new TableColumn({
        name: 'update_time',
        type: 'bigint',
        isNullable: false,
        default: 0,
      }),
    ]);

    await queryRunner.query(
      `UPDATE admin SET create_time = EXTRACT(EPOCH FROM created_at) * 1000, update_time = EXTRACT(EPOCH FROM updated_at) * 1000;`,
    );

    await queryRunner.dropColumns('admin', ['created_at', 'updated_at']);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('admin', [
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
        isNullable: false,
      }),
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
        isNullable: false,
      }),
    ]);

    await queryRunner.query(
      `UPDATE admin SET created_at = TO_TIMESTAMP(create_time / 1000), updated_at = TO_TIMESTAMP(update_time / 1000);`,
    );

    await queryRunner.dropColumns('admin', ['create_time', 'update_time']);
  }
}
