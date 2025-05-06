import { currentMilliTime } from '@app/common/utils/utils';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { DECIMAL_PRECISION, DECIMAL_SCALE } from '../constant';

@Entity('account_transfer')
export class AccountTransfer {
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
    name: 'from_type',
    type: 'smallint',
    nullable: false,
  })
  fromType: number;

  @Column({
    name: 'to_type',
    type: 'smallint',
    nullable: false,
  })
  toType: number;

  @Column({
    name: 'amount',
    type: 'decimal',
    nullable: false,
    precision: DECIMAL_PRECISION,
    scale: DECIMAL_SCALE,
  })
  amount: string;

  @Column({
    name: 'status',
    type: 'smallint',
    nullable: false,
    default: 1,
  })
  status: number;

  @Column({
    name: 'note',
    type: 'varchar',
    length: '255',
    nullable: true,
  })
  note: string;

  @Column({
    name: 'create_time',
    nullable: false,
    type: 'bigint',
  })
  createTime: string;

  @Column({
    name: 'update_time',
    nullable: false,
    type: 'bigint',
  })
  updateTime: string;

  @BeforeInsert()
  createDates() {
    const time = currentMilliTime();
    this.createTime = time;
    this.updateTime = time;
  }

  @BeforeUpdate()
  updateDates() {
    this.updateTime = currentMilliTime();
  }
}
