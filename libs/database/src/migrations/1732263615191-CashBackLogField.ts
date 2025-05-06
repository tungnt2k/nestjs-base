import { ZERO_VALUE } from '@app/common/utils/number.util';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

import { DECIMAL_PRECISION, DECIMAL_SCALE } from '../constant';

export class CashBackLogField1732263615191 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('cashback_history', [
      new TableColumn({
        name: 'level',
        type: 'smallint',
        isNullable: false,
        default: 1,
      }),
      new TableColumn({
        name: 'rate',
        type: 'decimal',
        precision: DECIMAL_PRECISION,
        scale: DECIMAL_SCALE,
        isNullable: false,
        default: ZERO_VALUE,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('cashback_history', ['level', 'rate']);
  }
}
