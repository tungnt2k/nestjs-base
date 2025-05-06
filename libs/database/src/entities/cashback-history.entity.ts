import { currentMilliTime } from '@app/common/utils/utils';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { DECIMAL_PRECISION, DECIMAL_SCALE } from '../constant';

@Entity('cashback_history')
export class CashbackHistory {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    unsigned: true,
  })
  id: string;

  @Column({
    name: 'user_id',
    nullable: false,
    type: 'bigint',
  })
  userId: string;

  @Column({
    name: 'feeder_fund',
    nullable: false,
    type: 'decimal',
    scale: DECIMAL_SCALE,
    precision: DECIMAL_PRECISION,
  })
  feederFund: string;

  @Column({
    name: 'amount',
    nullable: false,
    type: 'decimal',
    scale: DECIMAL_SCALE,
    precision: DECIMAL_PRECISION,
  })
  amount: string;

  @Column({
    name: 'rate',
    nullable: false,
    type: 'decimal',
    scale: DECIMAL_SCALE,
    precision: DECIMAL_PRECISION,
  })
  rate: string;

  @Column({
    name: 'level',
    nullable: false,
    type: 'smallint',
  })
  level: number;

  @Column({
    name: 'checkpoint',
    nullable: false,
    type: 'bigint',
  })
  checkpoint: string;

  @Column({
    name: 'create_time',
    nullable: false,
    type: 'bigint',
  })
  createTime: string;

  @BeforeInsert()
  createDates() {
    this.createTime = currentMilliTime();
  }
}
