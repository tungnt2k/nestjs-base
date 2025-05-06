import { ZERO_VALUE } from '@app/common/utils/number.util';
import { DEFAULT_VALUE_SYSTEM_CONFIG, SYSTEM_CONFIG_KEY } from '@app/system-config/constant';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

import { DECIMAL_PRECISION, DECIMAL_SCALE } from '../constant';

export class AlterTableSymBolConfigAddInitPrice1731950626660 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'symbol_setting',
      new TableColumn({
        name: 'init_price',
        type: 'decimal',
        precision: DECIMAL_PRECISION,
        scale: DECIMAL_SCALE,
        isNullable: false,
        default: ZERO_VALUE,
      }),
    );

    await queryRunner.dropColumns('symbol_setting', ['otc_max_change']);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('symbol_setting', 'init_price');

    await queryRunner.addColumns('symbol_setting', [
      new TableColumn({
        name: 'otc_max_change',
        type: 'decimal',
        precision: DECIMAL_PRECISION,
        scale: DECIMAL_SCALE,
        isNullable: false,
        default: DEFAULT_VALUE_SYSTEM_CONFIG[SYSTEM_CONFIG_KEY.OTC_MAX_CHANGE],
      }),
    ]);
  }
}
