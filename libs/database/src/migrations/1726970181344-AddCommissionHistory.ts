import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCommissionHistory1726970181344 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'commission_history',
      new TableColumn({
        name: 'status',
        type: 'smallint',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('commission_history', 'status');
  }
}
