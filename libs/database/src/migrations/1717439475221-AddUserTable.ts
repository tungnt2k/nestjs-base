import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddUserTable1717439475221 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
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
            name: 'email',
            type: 'varchar',
            length: '60',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'last_login',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'nickname',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'active',
            type: 'boolean',
            default: false,
            isNullable: false,
          },
          {
            name: 'verified',
            type: 'boolean',
            default: false,
            isNullable: false,
          },
          {
            name: 'sponsor',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'vip_user',
            type: 'boolean',
            default: false,
            isNullable: false,
          },
          {
            name: 'ref_code',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'active_2fa',
            type: 'boolean',
            default: false,
            isNullable: false,
          },
          {
            name: 'level_vip',
            type: 'int',
            default: 1,
            isNullable: false,
          },
          {
            name: 'parent_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'parents',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'children',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'verify_token',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'secret',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'block_withdrawal',
            type: 'boolean',
            default: false,
            isNullable: false,
          },
          {
            name: 'kyc',
            type: 'boolean',
            default: false,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
