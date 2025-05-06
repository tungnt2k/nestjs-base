import { DECIMAL_PRECISION, DECIMAL_SCALE } from '@app/database/constant';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddFeeColumnInTx1721223758912 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'transaction',
      new TableColumn({
        name: 'fee',
        type: 'decimal',
        precision: DECIMAL_PRECISION,
        scale: DECIMAL_SCALE,
        isNullable: false,
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transaction', 'fee');
  }
}
