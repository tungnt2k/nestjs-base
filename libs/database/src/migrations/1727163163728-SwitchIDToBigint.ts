import { MigrationInterface, QueryRunner } from 'typeorm';

export class SwitchIDToBigint1727163163728 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // account
    await queryRunner.query('ALTER TABLE account ALTER COLUMN id SET DATA TYPE bigint;');
    await queryRunner.query('ALTER TABLE account ALTER COLUMN user_id SET DATA TYPE bigint;');

    // account_history
    await queryRunner.query('ALTER TABLE account_history ALTER COLUMN id SET DATA TYPE bigint;');
    await queryRunner.query('ALTER TABLE account_history ALTER COLUMN account_id SET DATA TYPE bigint;');
    await queryRunner.query('ALTER TABLE account_history ALTER COLUMN ref_id SET DATA TYPE bigint;');

    // admin
    await queryRunner.query('ALTER TABLE admin ALTER COLUMN id SET DATA TYPE bigint;');

    // country
    await queryRunner.query('ALTER TABLE country ALTER COLUMN id SET DATA TYPE bigint;');

    // faq
    await queryRunner.query('ALTER TABLE faq ALTER COLUMN id SET DATA TYPE bigint;');

    // kyc
    await queryRunner.query('ALTER TABLE kyc ALTER COLUMN id SET DATA TYPE bigint;');
    await queryRunner.query('ALTER TABLE kyc ALTER COLUMN user_id SET DATA TYPE bigint;');

    // notification
    await queryRunner.query('ALTER TABLE notification ALTER COLUMN id SET DATA TYPE bigint;');
    await queryRunner.query('ALTER TABLE notification ALTER COLUMN receiver_id SET DATA TYPE bigint;');
    await queryRunner.query('ALTER TABLE notification ALTER COLUMN notify_resource_id SET DATA TYPE bigint;');

    // support_message
    await queryRunner.query('ALTER TABLE support_message ALTER COLUMN id SET DATA TYPE bigint;');
    await queryRunner.query('ALTER TABLE support_message ALTER COLUMN ticket_id SET DATA TYPE bigint;');
    await queryRunner.query('ALTER TABLE support_message ALTER COLUMN sender_id SET DATA TYPE bigint;');
    await queryRunner.query('ALTER TABLE support_message ALTER COLUMN parent_id SET DATA TYPE bigint;');

    // support_ticket
    await queryRunner.query('ALTER TABLE support_ticket ALTER COLUMN id SET DATA TYPE bigint;');
    await queryRunner.query('ALTER TABLE support_ticket ALTER COLUMN user_id SET DATA TYPE bigint;');

    // symbol_setting
    await queryRunner.query('ALTER TABLE symbol_setting ALTER COLUMN id SET DATA TYPE bigint;');

    // system_config
    await queryRunner.query('ALTER TABLE system_config ALTER COLUMN id SET DATA TYPE bigint;');

    // trade_history
    await queryRunner.query('ALTER TABLE trade_history ALTER COLUMN id SET DATA TYPE bigint;');
    await queryRunner.query('ALTER TABLE trade_history ALTER COLUMN user_id SET DATA TYPE bigint;');

    // transaction
    await queryRunner.query('ALTER TABLE transaction ALTER COLUMN id SET DATA TYPE bigint;');
    await queryRunner.query('ALTER TABLE transaction ALTER COLUMN user_id SET DATA TYPE bigint;');

    // user
    await queryRunner.query('ALTER TABLE "user" ALTER COLUMN id SET DATA TYPE bigint;');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // account
    await queryRunner.query('ALTER TABLE account ALTER COLUMN id SET DATA TYPE int;');
    await queryRunner.query('ALTER TABLE account ALTER COLUMN user_id SET DATA TYPE int;');

    // account_history
    await queryRunner.query('ALTER TABLE account_history ALTER COLUMN id SET DATA TYPE int;');
    await queryRunner.query('ALTER TABLE account_history ALTER COLUMN account_id SET DATA TYPE int;');
    await queryRunner.query('ALTER TABLE account_history ALTER COLUMN ref_id SET DATA TYPE int;');

    // admin
    await queryRunner.query('ALTER TABLE admin ALTER COLUMN id SET DATA TYPE int;');

    // country
    await queryRunner.query('ALTER TABLE country ALTER COLUMN id SET DATA TYPE int;');

    // faq
    await queryRunner.query('ALTER TABLE faq ALTER COLUMN id SET DATA TYPE int;');

    // kyc
    await queryRunner.query('ALTER TABLE kyc ALTER COLUMN id SET DATA TYPE int;');
    await queryRunner.query('ALTER TABLE kyc ALTER COLUMN user_id SET DATA TYPE int;');

    // notification
    await queryRunner.query('ALTER TABLE notification ALTER COLUMN id SET DATA TYPE int;');
    await queryRunner.query('ALTER TABLE notification ALTER COLUMN receiver_id SET DATA TYPE int;');
    await queryRunner.query('ALTER TABLE notification ALTER COLUMN notify_resource_id SET DATA TYPE int;');

    // support_message
    await queryRunner.query('ALTER TABLE support_message ALTER COLUMN id SET DATA TYPE int;');
    await queryRunner.query('ALTER TABLE support_message ALTER COLUMN ticket_id SET DATA TYPE int;');
    await queryRunner.query('ALTER TABLE support_message ALTER COLUMN sender_id SET DATA TYPE int;');
    await queryRunner.query('ALTER TABLE support_message ALTER COLUMN parent_id SET DATA TYPE int;');

    // support_ticket
    await queryRunner.query('ALTER TABLE support_ticket ALTER COLUMN id SET DATA TYPE int;');
    await queryRunner.query('ALTER TABLE support_ticket ALTER COLUMN user_id SET DATA TYPE int;');

    // symbol_setting
    await queryRunner.query('ALTER TABLE symbol_setting ALTER COLUMN id SET DATA TYPE int;');

    // system_config
    await queryRunner.query('ALTER TABLE system_config ALTER COLUMN id SET DATA TYPE int;');

    // trade_history
    await queryRunner.query('ALTER TABLE trade_history ALTER COLUMN id SET DATA TYPE int;');
    await queryRunner.query('ALTER TABLE trade_history ALTER COLUMN user_id SET DATA TYPE int;');

    // transaction
    await queryRunner.query('ALTER TABLE transaction ALTER COLUMN id SET DATA TYPE int;');
    await queryRunner.query('ALTER TABLE transaction ALTER COLUMN user_id SET DATA TYPE int;');

    // user
    await queryRunner.query('ALTER TABLE "user" ALTER COLUMN id SET DATA TYPE int;');
  }
}
