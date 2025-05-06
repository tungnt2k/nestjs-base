import { ZERO_VALUE } from '@app/common/utils/number.util';
import { DECIMAL_PRECISION, DECIMAL_SCALE } from '@app/database/constant';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserRemoveTotalAff1729528796351 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('user', ['total_turnover', 'total_revenue_sharing']);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('user', [
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
}
