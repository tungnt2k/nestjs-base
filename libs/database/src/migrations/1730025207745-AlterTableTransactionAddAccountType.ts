import { ACCOUNT_TYPE } from '@app/common/enums/enum';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableTransactionAddAccountType1730025207745 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'transaction',
      new TableColumn({
        name: 'account_type',
        type: 'smallint',
        isNullable: false,
        default: ACCOUNT_TYPE.LIVE,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transaction', 'account_type');
  }
}
