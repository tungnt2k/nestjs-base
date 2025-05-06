import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateSignalNavigatorTable1730520416801 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('signal_navigator', 'symbol_id');

    await queryRunner.addColumn(
      'signal_navigator',
      new TableColumn({
        name: 'symbol',
        type: 'varchar',
        length: '50',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('signal_navigator', 'symbol');

    await queryRunner.addColumn(
      'signal_navigator',
      new TableColumn({
        name: 'symbol_id',
        type: 'bigint',
        isNullable: false,
      }),
    );
  }
}
