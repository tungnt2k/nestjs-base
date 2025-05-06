import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableUserSupportAffiliate1726718731103 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('user', ['sponsor', 'parents', 'children', 'vip_user', 'level_vip', 'parent_id']);

    await queryRunner.addColumns('user', [
      new TableColumn({
        name: 'parent_id',
        type: 'bigint',
        isNullable: true,
      }),
      new TableColumn({
        name: 'affiliate_revenue_level',
        type: 'smallint',
        isNullable: false,
        default: 1,
      }),
      new TableColumn({
        name: 'affiliate_turnover_level',
        type: 'smallint',
        isNullable: false,
        default: 1,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('user', ['parent_id', 'affiliate_revenue_level', 'affiliate_turnover_level']);

    await queryRunner.addColumns('user', [
      new TableColumn({
        name: 'sponsor',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
      new TableColumn({
        name: 'parents',
        type: 'json',
        isNullable: true,
      }),
      new TableColumn({
        name: 'children',
        type: 'json',
        isNullable: true,
      }),
      new TableColumn({
        name: 'vip_user',
        type: 'boolean',
        default: false,
        isNullable: false,
      }),
      new TableColumn({
        name: 'level_vip',
        type: 'int',
        default: 1,
        isNullable: false,
      }),
    ]);
  }
}
