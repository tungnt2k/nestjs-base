import { ZERO_VALUE } from '@app/common/utils/number.util';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

import { DECIMAL_PRECISION, DECIMAL_SCALE } from '../constant';

export class AlterTableAccountToSupportHoldBalance1726735374013 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('account', ['deposit', 'withdrawal', 'order_amount']);

    await queryRunner.changeColumn(
      'account',
      'balance_pending',
      new TableColumn({
        name: 'holding',
        type: 'decimal',
        precision: DECIMAL_PRECISION,
        scale: DECIMAL_SCALE,
        isNullable: false,
        default: ZERO_VALUE,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('account', [
      new TableColumn({
        name: 'deposit',
        type: 'decimal',
        precision: DECIMAL_PRECISION,
        scale: DECIMAL_SCALE,
        isNullable: false,
        default: ZERO_VALUE,
      }),
      new TableColumn({
        name: 'withdrawal',
        type: 'decimal',
        precision: DECIMAL_PRECISION,
        scale: DECIMAL_SCALE,
        isNullable: false,
        default: ZERO_VALUE,
      }),
      new TableColumn({
        name: 'order_amount',
        type: 'decimal',
        precision: DECIMAL_PRECISION,
        scale: DECIMAL_SCALE,
        isNullable: false,
        default: ZERO_VALUE,
      }),
    ]);

    await queryRunner.changeColumn(
      'account',
      'holding',
      new TableColumn({
        name: 'balance_pending',
        type: 'decimal',
        precision: DECIMAL_PRECISION,
        scale: DECIMAL_SCALE,
        isNullable: false,
        default: ZERO_VALUE,
      }),
    );
  }
}
