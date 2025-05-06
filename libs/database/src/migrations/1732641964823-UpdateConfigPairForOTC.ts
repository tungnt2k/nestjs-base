import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateConfigPairForOTC1732641964823 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE symbol_setting RENAME COLUMN otc_change_per_turn TO price_jump;`);
    await queryRunner.query(`ALTER TABLE symbol_setting RENAME COLUMN init_price TO start_price;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE symbol_setting RENAME COLUMN price_jump TO otc_change_per_turn;`);
    await queryRunner.query(`ALTER TABLE symbol_setting RENAME COLUMN start_price TO init_price;`);
  }
}
