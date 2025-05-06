import { ADMIN_ROLE } from '@app/common/enums/enum';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterAdminTable1726241490758 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('admin', ['type']);

    await queryRunner.changeColumns('admin', [
      {
        oldColumn: new TableColumn({
          name: 'nickname',
          type: 'varchar',
          length: '255',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'name',
          type: 'varchar',
          length: '255',
          isNullable: true,
        }),
      },
    ]);

    await queryRunner.addColumns('admin', [
      new TableColumn({
        name: 'phone',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
      new TableColumn({
        name: 'permission',
        type: 'jsonb',
        isNullable: false,
        default: "'[]'",
      }),
      new TableColumn({
        name: 'role',
        type: 'varchar',
        length: '255',
        isNullable: false,
        default: `'${ADMIN_ROLE.ROOT_ADMIN}'`,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('admin', ['phone', 'permission', 'role']);

    await queryRunner.changeColumns('admin', [
      {
        oldColumn: new TableColumn({
          name: 'role',
          type: 'varchar',
          length: '255',
          isNullable: false,
        }),
        newColumn: new TableColumn({
          name: 'type',
          type: 'varchar',
          length: '255',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'name',
          type: 'varchar',
          length: '255',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'nickname',
          type: 'varchar',
          length: '255',
          isNullable: true,
        }),
      },
    ]);

    await queryRunner.addColumns('admin', [
      new TableColumn({
        name: 'type',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
    ]);
  }
}
