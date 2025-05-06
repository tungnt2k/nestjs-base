import { DECIMAL_PRECISION, DECIMAL_SCALE } from '@app/database/constant';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddPriceTable1717439462518 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'price',
        columns: [
          {
            name: 'symbol',
            type: 'varchar',
            length: '20',
            isPrimary: true,
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'price',
            type: 'decimal',
            precision: DECIMAL_PRECISION,
            scale: DECIMAL_SCALE,
            isNullable: false,
            default: 0,
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
    await queryRunner.dropTable('price');
  }
}
