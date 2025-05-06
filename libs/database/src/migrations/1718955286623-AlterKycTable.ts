import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterKycTable1718955286623 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('kyc', ['card_number', 'last_name', 'first_name', 'country']);

    await queryRunner.addColumns('kyc', [
      new TableColumn({
        name: 'document_type',
        type: 'varchar',
        length: '50',
        isNullable: false,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('kyc', 'document_type');

    await queryRunner.addColumns('kyc', [
      new TableColumn({
        name: 'card_number',
        type: 'varchar',
        length: '20',
        isNullable: false,
      }),
      new TableColumn({
        name: 'last_name',
        type: 'varchar',
        length: '100',
        isNullable: false,
      }),
      new TableColumn({
        name: 'first_name',
        type: 'varchar',
        length: '100',
        isNullable: false,
      }),
      new TableColumn({
        name: 'country',
        type: 'varchar',
        length: '20',
        isNullable: false,
      }),
    ]);
  }
}
