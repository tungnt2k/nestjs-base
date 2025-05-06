import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndexForIncash1732637398008 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Table access_log
    await queryRunner.query(`CREATE INDEX access_log_user_id_idx ON access_log (user_id);`);

    // Table account_history
    await queryRunner.query(`CREATE INDEX account_history_account_id_idx ON account_history (account_id);`);

    // Table account_transfer
    await queryRunner.query(`CREATE INDEX account_transfer_user_id_idx ON account_transfer (user_id);`);

    // Table cashback_history
    await queryRunner.query(`CREATE INDEX cashback_history_user_id_idx ON cashback_history (user_id);`);

    // Table champion_competitor
    await queryRunner.query(`CREATE INDEX champion_competitor_user_id_idx ON champion_competitor (user_id);`);

    // Table commission_history
    await queryRunner.query(
      `CREATE INDEX commission_history_child_id_parent_id_idx ON commission_history (child_id, parent_id);`,
    );
    await queryRunner.query(`CREATE INDEX commission_history_create_time_idx ON commission_history (create_time);`);

    // Table commission_settlement_history
    await queryRunner.query(
      `CREATE INDEX commission_settlement_history_child_id_parent_id_idx ON commission_settlement_history (child_id, parent_id);`,
    );

    // Table kyc
    await queryRunner.query(`CREATE INDEX kyc_user_id_idx ON kyc (user_id);`);

    // Table promo_code_condition
    await queryRunner.query(
      `CREATE INDEX promo_code_condition_promo_code_id_idx ON promo_code_condition (promo_code_id);`,
    );

    // Table snapshot_user_pnl
    await queryRunner.query(`CREATE INDEX snapshot_user_pnl_user_id_time_idx ON snapshot_user_pnl (user_id, time);`);

    // Table support_message
    await queryRunner.query(
      `CREATE INDEX support_message_ticket_id_sender_id_idx ON support_message (ticket_id, sender_id);`,
    );

    // Table support_ticket
    await queryRunner.query(`CREATE INDEX support_ticket_user_id_idx ON support_ticket (user_id);`);

    // Table trade_history
    await queryRunner.query(`CREATE INDEX trade_history_user_id_idx ON trade_history (user_id);`);

    // Table user
    await queryRunner.query(`CREATE INDEX user_parent_id_idx ON "user" (parent_id);`);

    // Table transaction
    await queryRunner.query(`CREATE INDEX transaction_user_id_idx ON transaction (user_id);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Table access_log
    await queryRunner.query(`DROP INDEX IF EXISTS access_log_user_id_idx;`);

    // Table account_history
    await queryRunner.query(`DROP INDEX IF EXISTS account_history_account_id_idx;`);

    // Table account_transfer
    await queryRunner.query(`DROP INDEX IF EXISTS account_transfer_user_id_idx;`);

    // Table cashback_history
    await queryRunner.query(`DROP INDEX IF EXISTS cashback_history_user_id_idx;`);

    // Table champion_competitor
    await queryRunner.query(`DROP INDEX IF EXISTS champion_competitor_user_id_idx;`);

    // Table commission_history
    await queryRunner.query(`DROP INDEX IF EXISTS commission_history_child_id_parent_id_idx;`);
    await queryRunner.query(`DROP INDEX IF EXISTS commission_history_create_time_idx`);

    // Table commission_settlement_history
    await queryRunner.query(`DROP INDEX IF EXISTS commission_settlement_history_child_id_parent_id_idx;`);

    // Table kyc
    await queryRunner.query(`DROP INDEX IF EXISTS kyc_user_id_idx;`);

    // Table promo_code_condition
    await queryRunner.query(`DROP INDEX IF EXISTS promo_code_condition_promo_code_id_idx;`);

    // Table snapshot_user_pnl
    await queryRunner.query(`DROP INDEX IF EXISTS snapshot_user_pnl_user_id_time_idx;`);

    // Table support_message
    await queryRunner.query(`DROP INDEX IF EXISTS support_message_ticket_id_sender_id_idx;`);

    // Table support_ticket
    await queryRunner.query(`DROP INDEX IF EXISTS support_ticket_user_id_idx;`);

    // Table trade_history
    await queryRunner.query(`DROP INDEX IF EXISTS trade_history_user_id_idx;`);

    // Table user
    await queryRunner.query(`DROP INDEX IF EXISTS user_parent_id_idx;`);

    // Table transaction
    await queryRunner.query(`DROP INDEX IF EXISTS transaction_user_id_idx;`);
  }
}
