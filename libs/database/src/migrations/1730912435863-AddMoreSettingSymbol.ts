import { DECIMAL_PRECISION, DECIMAL_SCALE } from '@app/database/constant';
import { DEFAULT_VALUE_SYSTEM_CONFIG, SYSTEM_CONFIG_KEY } from '@app/system-config/constant';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddMoreSettingSymbol1730912435863 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('symbol_setting', [
      new TableColumn({
        name: 'otc_max_change',
        type: 'decimal',
        precision: DECIMAL_PRECISION,
        scale: DECIMAL_SCALE,
        isNullable: false,
        default: DEFAULT_VALUE_SYSTEM_CONFIG[SYSTEM_CONFIG_KEY.OTC_MAX_CHANGE],
      }),
      new TableColumn({
        name: 'otc_change_per_turn',
        type: 'decimal',
        precision: DECIMAL_PRECISION,
        scale: DECIMAL_SCALE,
        isNullable: false,
        default: DEFAULT_VALUE_SYSTEM_CONFIG[SYSTEM_CONFIG_KEY.OTC_CHANGE_PER_TURN],
      }),
    ]);

    await queryRunner.query(
      `ALTER TABLE symbol_setting ALTER COLUMN volume_scale SET DEFAULT ${DEFAULT_VALUE_SYSTEM_CONFIG[SYSTEM_CONFIG_KEY.OTC_VOLUME_SCALE]};`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('symbol_setting', ['otc_max_change', 'otc_change_per_turn']);

    await queryRunner.query(`ALTER TABLE symbol_setting ALTER COLUMN volume_scale DROP DEFAULT;`);
  }
}
