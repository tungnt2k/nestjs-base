import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableParticipant1726798857084 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'champion_competition',
      new TableColumn({
        name: 'max_competitor',
        type: 'bigint',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('champion_competition', 'max_competitor');
  }
}
