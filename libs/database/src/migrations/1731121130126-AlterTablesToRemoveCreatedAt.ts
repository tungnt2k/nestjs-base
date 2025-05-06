import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTablesToRemoveCreatedAt1731121130126 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Modify account table
    await queryRunner.addColumns('account', [
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
      `UPDATE "account" SET create_time = EXTRACT(EPOCH FROM created_at) * 1000, update_time = EXTRACT(EPOCH FROM updated_at) * 1000;`,
    );

    await queryRunner.dropColumns('account', ['created_at', 'updated_at']);

    // Modify kyc table
    await queryRunner.addColumns('kyc', [
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
      `UPDATE "kyc" SET create_time = EXTRACT(EPOCH FROM created_at) * 1000, update_time = EXTRACT(EPOCH FROM updated_at) * 1000;`,
    );

    await queryRunner.dropColumns('kyc', ['created_at', 'updated_at']);

    // Modify notification table
    await queryRunner.addColumns('notification', [
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
      `UPDATE "notification" SET create_time = EXTRACT(EPOCH FROM created_at) * 1000, update_time = EXTRACT(EPOCH FROM updated_at) * 1000;`,
    );

    await queryRunner.dropColumns('notification', ['created_at', 'updated_at']);

    // Modify price table
    await queryRunner.addColumns('price', [
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
      `UPDATE "price" SET create_time = EXTRACT(EPOCH FROM created_at) * 1000, update_time = EXTRACT(EPOCH FROM updated_at) * 1000;`,
    );

    await queryRunner.dropColumns('price', ['created_at', 'updated_at']);

    // Modify symbol_setting table
    await queryRunner.addColumns('symbol_setting', [
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
      `UPDATE "symbol_setting" SET create_time = EXTRACT(EPOCH FROM created_at) * 1000, update_time = EXTRACT(EPOCH FROM updated_at) * 1000;`,
    );

    await queryRunner.dropColumns('symbol_setting', ['created_at', 'updated_at']);

    // Modify system_config table
    await queryRunner.addColumns('system_config', [
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
      `UPDATE "system_config" SET create_time = EXTRACT(EPOCH FROM created_at) * 1000, update_time = EXTRACT(EPOCH FROM updated_at) * 1000;`,
    );

    await queryRunner.dropColumns('system_config', ['created_at', 'updated_at']);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Modify account table
    await queryRunner.addColumns('account', [
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
      `UPDATE "account" SET created_at = TO_TIMESTAMP(create_time / 1000), updated_at = TO_TIMESTAMP(update_time / 1000);`,
    );

    await queryRunner.dropColumns('account', ['create_time', 'update_time']);

    // Modify kyc table
    await queryRunner.addColumns('kyc', [
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
      `UPDATE "kyc" SET created_at = TO_TIMESTAMP(create_time / 1000), updated_at = TO_TIMESTAMP(update_time / 1000);`,
    );

    await queryRunner.dropColumns('kyc', ['create_time', 'update_time']);

    // Modify notification table
    await queryRunner.addColumns('notification', [
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
      `UPDATE "notification" SET created_at = TO_TIMESTAMP(create_time / 1000), updated_at = TO_TIMESTAMP(update_time / 1000);`,
    );

    await queryRunner.dropColumns('notification', ['create_time', 'update_time']);

    // Modify price table
    await queryRunner.addColumns('price', [
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
      `UPDATE "price" SET created_at = TO_TIMESTAMP(create_time / 1000), updated_at = TO_TIMESTAMP(update_time / 1000);`,
    );

    await queryRunner.dropColumns('price', ['create_time', 'update_time']);

    // Modify symbol_setting table
    await queryRunner.addColumns('symbol_setting', [
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
      `UPDATE "symbol_setting" SET created_at = TO_TIMESTAMP(create_time / 1000), updated_at = TO_TIMESTAMP(update_time / 1000);`,
    );

    await queryRunner.dropColumns('symbol_setting', ['create_time', 'update_time']);

    // Modify system_config table
    await queryRunner.addColumns('system_config', [
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
      `UPDATE "system_config" SET created_at = TO_TIMESTAMP(create_time / 1000), updated_at = TO_TIMESTAMP(update_time / 1000);`,
    );

    await queryRunner.dropColumns('system_config', ['create_time', 'update_time']);
  }
}
