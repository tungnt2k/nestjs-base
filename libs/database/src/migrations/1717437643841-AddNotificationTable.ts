import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddNotificationTable1717437643841 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notification',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isUnique: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'receiver_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'receiver_type',
            type: 'varchar',
            length: '25',
            isNullable: false,
          },
          {
            name: 'is_read',
            type: 'boolean',
            default: false,
          },
          {
            name: 'title',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'content',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'meta_data',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'notify_resource_type',
            type: 'varchar',
            length: '25',
            isNullable: false,
          },
          {
            name: 'notify_resource_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'notify_type',
            type: 'varchar',
            length: '25',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.query('CREATE INDEX notification_index ON notification(receiver_id,receiver_type);');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX notification_index ');
    await queryRunner.dropTable('notification');
  }
}
