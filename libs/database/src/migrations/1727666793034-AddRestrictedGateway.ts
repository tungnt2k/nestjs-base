import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddRestrictedGateway1727666793034 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'restricted_gateway',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'country_code',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'payment_service',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'create_time',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'update_time',
            type: 'bigint',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('restricted_gateway');
  }
}
