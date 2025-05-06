import { ZERO_VALUE } from '@app/common/utils/number.util';
import { DECIMAL_PRECISION, DECIMAL_SCALE } from '@app/database/constant';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateTableTransactionBonus1729354184010 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transaction', 'promo_code_bonus');

    await queryRunner.addColumn(
      'transaction',
      new TableColumn({
        name: 'bonus_type',
        type: 'smallint',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transaction', 'bonus_type');

    await queryRunner.addColumns('transaction', [
      new TableColumn({
        name: 'promo_code_bonus',
        type: 'decimal',
        precision: DECIMAL_PRECISION,
        scale: DECIMAL_SCALE,
        isNullable: true,
        default: ZERO_VALUE,
      }),
    ]);
  }
}
