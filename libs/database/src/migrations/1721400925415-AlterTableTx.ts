import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableTx1721400925415 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('transaction', [
      new TableColumn({
        name: 'destination',
        type: 'text',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transaction', 'destination');
  }
}
