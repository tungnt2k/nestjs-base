import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropSequenceUserAndTrade1729066760542 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SEQUENCE IF EXISTS trade_history_id_seq CASCADE;`);
    await queryRunner.query(`DROP SEQUENCE IF EXISTS user_id_seq CASCADE;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DO $$
        DECLARE
            max_id bigint;
        BEGIN
            -- Get the maximum id from the table
            SELECT COALESCE(MAX(id), 0) + 1 INTO max_id FROM trade_history;

            -- Create the sequence starting from the max_id + 1
            EXECUTE format('CREATE SEQUENCE trade_history_id_seq START WITH %s;', max_id);

            -- Alter the table to set the default for the id column using the sequence
            EXECUTE 'ALTER TABLE trade_history ALTER COLUMN id SET DEFAULT nextval(''trade_history_id_seq'');';

            -- Optionally set sequence ownership to the column
            EXECUTE 'ALTER SEQUENCE trade_history_id_seq OWNED BY trade_history.id;';
        END $$;
    `);

    await queryRunner.query(`
        DO $$
        DECLARE
            max_id bigint;
        BEGIN
            -- Get the maximum id from the table
            SELECT COALESCE(MAX(id), 0) + 1 INTO max_id FROM "user";

            -- Create the sequence starting from the max_id + 1
            EXECUTE format('CREATE SEQUENCE user_id_seq START WITH %s;', max_id);

            -- Alter the table to set the default for the id column using the sequence
            EXECUTE 'ALTER TABLE "user" ALTER COLUMN id SET DEFAULT nextval(''user_id_seq'');';

            -- Optionally set sequence ownership to the column
            EXECUTE 'ALTER SEQUENCE user_id_seq OWNED BY "user".id;';
        END $$;
    `);
  }
}
