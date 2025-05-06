import { ZERO_VALUE } from '@app/common/utils/number.util';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveTotalInviteAndTotalDPChild1731165981512 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('user', ['total_invite', 'total_deposit_invite']);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('user', [
      new TableColumn({
        name: 'total_invite',
        type: 'bigint',
        isNullable: false,
        default: ZERO_VALUE,
      }),
      new TableColumn({
        name: 'total_deposit_invite',
        type: 'bigint',
        isNullable: false,
        default: ZERO_VALUE,
      }),
    ]);
  }
}
