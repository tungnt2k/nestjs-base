import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserAdd2faVerifyLoginDeposit1719416272708 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('user', [
      new TableColumn({
        name: 'verify_withdraw_2fa',
        type: 'boolean',
        isNullable: false,
        default: false,
      }),
      new TableColumn({
        name: 'verify_login_2fa',
        type: 'boolean',
        isNullable: false,
        default: false,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('user', ['verify_withdraw_2fa', 'verify_login_2fa']);
  }
}
