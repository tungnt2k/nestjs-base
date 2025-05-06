import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableUserChangeCreateTimeUpdateTime1731120371031 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('user', [
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
      new TableColumn({
        name: 'last_login_time',
        type: 'bigint',
        isNullable: true,
      }),
    ]);

    await queryRunner.query(
      `UPDATE "user" SET create_time = EXTRACT(EPOCH FROM created_at) * 1000, update_time = EXTRACT(EPOCH FROM updated_at) * 1000;`,
    );

    await queryRunner.dropColumns('user', ['created_at', 'updated_at', 'last_login']);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('user', [
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
      new TableColumn({
        name: 'last_login',
        type: 'timestamp',
        isNullable: true,
      }),
    ]);

    await queryRunner.query(
      `UPDATE "user" SET created_at = TO_TIMESTAMP(create_time / 1000), updated_at = TO_TIMESTAMP(update_time / 1000);`,
    );

    await queryRunner.dropColumns('user', ['create_time', 'update_time', 'last_login_time']);
  }
}
