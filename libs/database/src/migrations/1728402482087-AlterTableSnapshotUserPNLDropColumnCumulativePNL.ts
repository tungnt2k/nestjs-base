import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

import { DECIMAL_PRECISION, DECIMAL_SCALE } from '../constant';

export class AlterTableSnapshotUserPNLDropColumnCumulativePNL1728402482087 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('snapshot_user_pnl', 'cumulative_pnl');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'snapshot_user_pnl',
      new TableColumn({
        name: 'cumulative_pnl',
        type: 'decimal',
        precision: DECIMAL_PRECISION,
        scale: DECIMAL_SCALE,
        isNullable: false,
      }),
    );
  }
}
