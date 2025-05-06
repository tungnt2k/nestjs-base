import { ACCOUNT_TYPE, ORDER_TYPE, TRADE_RESULT, TRADE_STATUS } from '@app/common/enums/enum';
import { currentMilliTime } from '@app/common/utils/utils';
import { Expose } from 'class-transformer';
import { BeforeUpdate, Column, Entity, PrimaryColumn } from 'typeorm';

import { DECIMAL_PRECISION, DECIMAL_SCALE } from '../constant';

@Entity('trade_history')
export class TradeHistory {
  @Expose({ name: 'id' })
  @PrimaryColumn({
    type: 'bigint',
    name: 'id',
    unsigned: true,
  })
  id: string;

  @Expose({ name: 'user_id' })
  @Column({
    name: 'user_id',
    type: 'bigint',
    nullable: false,
  })
  userId: string;

  @Expose({ name: 'type' })
  @Column({
    name: 'type',
    type: 'smallint',
    nullable: false,
  })
  type: ORDER_TYPE;

  @Expose({ name: 'account_type' })
  @Column({
    name: 'account_type',
    type: 'smallint',
    nullable: false,
  })
  accountType: ACCOUNT_TYPE;

  @Expose({ name: 'symbol' })
  @Column({
    name: 'symbol',
    nullable: false,
    type: 'varchar',
    length: 10,
  })
  symbol: string;

  @Expose({ name: 'amount' })
  @Column({
    name: 'amount',
    type: 'decimal',
    nullable: true,
    precision: 30,
    scale: 6,
    default: 0,
  })
  amount: string;

  @Expose({ name: 'after_balance' })
  @Column({
    name: 'after_balance',
    type: 'decimal',
    nullable: true,
    precision: 30,
    scale: 6,
    default: 0,
  })
  afterBalance: string;

  @Expose({ name: 'profit' })
  @Column({
    name: 'profit',
    type: 'decimal',
    nullable: false,
    default: 0,
    precision: DECIMAL_PRECISION,
    scale: DECIMAL_SCALE,
  })
  profit: string;

  @Column({
    name: 'status',
    type: 'smallint',
    nullable: false,
  })
  status: TRADE_STATUS;

  @Expose({ name: 'close_time' })
  @Column({
    name: 'close_time',
    type: 'bigint',
    nullable: false,
  })
  closeTime: string;

  @Expose({ name: 'open_price' })
  @Column({
    name: 'open_price',
    type: 'decimal',
    precision: DECIMAL_PRECISION,
    scale: DECIMAL_SCALE,
    nullable: false,
  })
  openPrice: string;

  @Expose({ name: 'close_price' })
  @Column({
    name: 'close_price',
    type: 'decimal',
    precision: DECIMAL_PRECISION,
    scale: DECIMAL_SCALE,
    nullable: true,
  })
  closePrice: string;

  @Expose({ name: 'result' })
  @Column({
    name: 'result',
    nullable: true,
    type: 'smallint',
    default: 0,
  })
  result: TRADE_RESULT;

  @Expose({ name: 'open_time' })
  @Column({
    name: 'open_time',
    nullable: false,
    type: 'bigint',
    default: 0,
  })
  openTime: string;

  @Expose({ name: 'snapshot_price' })
  @Column({
    name: 'snapshot_price',
    nullable: true,
    type: 'jsonb',
  })
  snapshotPrice: Record<string, string>;

  @Expose({ name: 'update_time' })
  @Column({
    name: 'update_time',
    nullable: false,
    type: 'bigint',
    default: 0,
  })
  updateTime: string;

  @BeforeUpdate()
  update() {
    this.updateTime = currentMilliTime();
  }
}
