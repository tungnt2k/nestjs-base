import { KYC_STATUS } from '@app/common/enums/enum';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableKYC1718212522884 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'kyc',
      'status',
      new TableColumn({
        name: 'status',
        type: 'smallint',
        isNullable: false,
        default: KYC_STATUS.SUBMITTED,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'kyc',
      'status',
      new TableColumn({
        name: 'status',
        type: 'boolean',
        isNullable: false,
        default: false,
      }),
    );
  }
}
