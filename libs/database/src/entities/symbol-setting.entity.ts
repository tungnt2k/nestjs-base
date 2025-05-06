import { ZERO_VALUE } from '@app/common/utils/number.util';
import { currentMilliTime } from '@app/common/utils/utils';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

import { DECIMAL_PRECISION, DECIMAL_SCALE } from '../constant';

@Entity('symbol_setting')
export class SymbolSetting {
  @PrimaryGeneratedColumn()
  @PrimaryColumn('bigint')
  id: string;

  @Column({
    name: 'symbol',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  symbol: string;

  @Column({
    name: 'base_icon',
    type: 'text',
    nullable: true,
  })
  baseIcon: string;

  @Column({
    name: 'quote_icon',
    type: 'text',
    nullable: true,
  })
  quoteIcon: string;

  @Column({
    name: 'payout_rate',
    type: 'decimal',
    precision: DECIMAL_PRECISION,
    scale: DECIMAL_SCALE,
    default: 0,
    nullable: true,
  })
  payoutRate: string;

  @Column({
    name: 'type',
    type: 'smallint',
    nullable: false,
  })
  type: number;

  @Column({
    name: 'is_otc',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isOtc: boolean;

  @Column({
    name: 'base_symbol',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  baseSymbol: string;

  @Column({
    name: 'volume_scale',
    type: 'decimal',
    precision: DECIMAL_PRECISION,
    scale: DECIMAL_SCALE,
    nullable: true,
  })
  volumeScale: string;

  @Column({
    name: 'start_price',
    type: 'decimal',
    precision: DECIMAL_PRECISION,
    scale: DECIMAL_SCALE,
    nullable: false,
    default: ZERO_VALUE,
  })
  startPrice: string;

  @Column({
    name: 'price_jump',
    type: 'decimal',
    precision: DECIMAL_PRECISION,
    scale: DECIMAL_SCALE,
    nullable: false,
  })
  priceJump: string;

  @Column({
    name: 'status',
    type: 'smallint',
    nullable: false,
  })
  status: number;

  @Column({
    name: 'order',
    type: 'int',
    nullable: true,
  })
  order: number;

  @Column({
    name: 'decimal',
    type: 'int',
    nullable: true,
    default: '0',
  })
  decimal: number;

  @Column({
    name: 'create_time',
    type: 'bigint',
    nullable: false,
  })
  createTime: string;

  @Column({
    name: 'update_time',
    type: 'bigint',
    nullable: false,
  })
  updateTime: string;

  @BeforeInsert()
  createDates() {
    this.createTime = currentMilliTime();
    this.updateTime = this.createTime;
  }

  @BeforeUpdate()
  updateDates() {
    this.updateTime = currentMilliTime();
  }
}
