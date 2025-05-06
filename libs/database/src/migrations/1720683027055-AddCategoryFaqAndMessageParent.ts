import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCategoryFaqAndMessageParent1720683027055 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'faq',
      new TableColumn({
        name: 'category',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'support_message',
      new TableColumn({
        name: 'parent_id',
        type: 'int4',
        default: '0',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('faq', 'category');

    await queryRunner.dropColumn('support_message', 'parent_id');
  }
}
