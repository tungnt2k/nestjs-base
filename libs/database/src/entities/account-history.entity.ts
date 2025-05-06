import { ACC_HISTORY_ADJUST_TYPE, ACC_HISTORY_REF_TYPE, ACC_HISTORY_TYPE } from '@app/common/enums/enum';
import { currentMilliTime } from '@app/common/utils/utils';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { DECIMAL_PRECISION, DECIMAL_SCALE } from '../constant';

@Entity('account_history')
export class AccountHistory {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    unsigned: true,
  })
  id: string;

  @Column({
    name: 'account_id',
    type: 'bigint',
    nullable: false,
  })
  accountId: string;

  @Column({
    name: 'type',
    type: 'smallint',
    nullable: false,
  })
  type: ACC_HISTORY_TYPE;

  @Column({
    name: 'ref_type',
    type: 'smallint',
    nullable: true,
  })
  refType: ACC_HISTORY_REF_TYPE;

  @Column({
    name: 'ref_id',
    type: 'bigint',
    nullable: true,
  })
  refId: string;

  @Column({
    name: 'adjust_type',
    type: 'smallint',
    nullable: false,
  })
  adjustType: ACC_HISTORY_ADJUST_TYPE;

  @Column({
    name: 'amount',
    type: 'decimal',
    nullable: false,
    precision: DECIMAL_PRECISION,
    scale: DECIMAL_SCALE,
    default: 0,
  })
  amount: string;

  @Column({
    name: 'balance_after',
    type: 'decimal',
    nullable: false,
    precision: DECIMAL_PRECISION,
    scale: DECIMAL_SCALE,
    default: 0,
  })
  balanceAfter: string;

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
