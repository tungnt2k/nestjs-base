import { ZERO_VALUE } from '@app/common/utils/number.util';
import { currentMilliTime } from '@app/common/utils/utils';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { DECIMAL_PRECISION, DECIMAL_SCALE } from '../constant';

@Entity('account')
export class Account {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    unsigned: true,
  })
  id: string;

  @Column({
    name: 'user_id',
    type: 'bigint',
    nullable: false,
  })
  userId: string;

  @Column({
    name: 'type',
    type: 'smallint',
    nullable: false,
  })
  type: number;

  @Column({
    name: 'win',
    type: 'int',
    nullable: false,
    default: 0,
  })
  win: number;

  @Column({
    name: 'lose',
    type: 'int',
    nullable: false,
    default: 0,
  })
  lose: number;

  @Column({
    name: 'balance',
    type: 'decimal',
    nullable: false,
    precision: DECIMAL_PRECISION,
    scale: DECIMAL_SCALE,
    default: 0,
  })
  balance: string;

  @Column({
    name: 'holding',
    type: 'decimal',
    nullable: false,
    precision: DECIMAL_PRECISION,
    scale: DECIMAL_SCALE,
    default: 0,
  })
  holding: string;

  locking: string = ZERO_VALUE;

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
