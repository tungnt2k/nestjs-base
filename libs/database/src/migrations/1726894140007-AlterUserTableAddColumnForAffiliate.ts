import { ZERO_VALUE } from '@app/common/utils/number.util';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

import { DECIMAL_PRECISION, DECIMAL_SCALE } from '../constant';

export class AlterUserTableAddColumnForAffiliate1726894140007 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('user', [
      new TableColumn({
        name: 'total_invite',
        type: 'bigint',
        isNullable: false,
        default: ZERO_VALUE,
      }),
      new TableColumn({
        name: 'total_deposit_invite',
        type: 'bigint',
        isNullable: false,
        default: ZERO_VALUE,
      }),
      new TableColumn({
        name: 'total_turnover',
        type: 'decimal',
        precision: DECIMAL_PRECISION,
        scale: DECIMAL_SCALE,
        isNullable: false,
        default: ZERO_VALUE,
      }),
      new TableColumn({
        name: 'total_revenue_sharing',
        type: 'decimal',
        precision: DECIMAL_PRECISION,
        scale: DECIMAL_SCALE,
        isNullable: false,
        default: ZERO_VALUE,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('user', [
      'total_invite',
      'total_deposit_invite',
      'total_turnover',
      'total_revenue_sharing',
    ]);
  }
}
