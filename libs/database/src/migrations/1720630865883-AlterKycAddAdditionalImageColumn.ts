import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterKycAddAdditionalImageColumn1720630865883 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'kyc',
      new TableColumn({
        name: 'additional_image',
        type: 'varchar',
        length: '100',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('kyc', 'additional_image');
  }
}
