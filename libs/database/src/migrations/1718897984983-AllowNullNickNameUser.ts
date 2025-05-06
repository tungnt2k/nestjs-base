import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AllowNullNickNameUser1718897984983 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'user',
      'nickname',
      new TableColumn({
        name: 'nickname',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'user',
      'nickname',
      new TableColumn({
        name: 'nickname',
        type: 'varchar',
        length: '255',
        isNullable: false,
      }),
    );
  }
}
