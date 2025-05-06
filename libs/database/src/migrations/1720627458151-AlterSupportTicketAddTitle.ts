import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterSupportTicketAddTitle1720627458151 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'support_ticket',
      new TableColumn({
        name: 'title',
        type: 'varchar',
        length: '200',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('support_ticket', 'title');
  }
}
