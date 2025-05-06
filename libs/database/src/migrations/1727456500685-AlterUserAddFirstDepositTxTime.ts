import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserAddFirstDepositTxTime1727456500685 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'first_deposit_tx_time',
        type: 'bigint',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'unlock_withdraw_affiliate',
        type: 'boolean',
        isNullable: false,
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'first_deposit_tx_time');
    await queryRunner.dropColumn('user', 'unlock_withdraw_affiliate');
  }
}
