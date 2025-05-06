import { ZERO_VALUE } from '@app/common/utils/number.util';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

import { DECIMAL_PRECISION, DECIMAL_SCALE } from '../constant';

export class AlterTableTransactionAddPromoCode1728637616451 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('transaction', [
      new TableColumn({
        name: 'promo_code',
        type: 'varchar',
        length: '100',
        isNullable: true,
      }),
      new TableColumn({
        name: 'promo_code_bonus',
        type: 'decimal',
        precision: DECIMAL_PRECISION,
        scale: DECIMAL_SCALE,
        isNullable: false,
        default: ZERO_VALUE,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('transaction', ['promo_code', 'promo_code_bonus']);
  }
}
