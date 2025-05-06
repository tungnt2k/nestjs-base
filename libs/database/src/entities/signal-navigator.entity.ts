import { currentMilliTime } from '@app/common/utils/utils';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { DECIMAL_PRECISION, DECIMAL_SCALE } from '../constant';

@Entity('signal_navigator')
export class SignalNavigator {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    unsigned: true,
  })
  id: string;

  @Column({
    name: 'symbol',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  symbol: string;

  @Column({
    name: 'trigger_price',
    type: 'decimal',
    precision: DECIMAL_PRECISION,
    scale: DECIMAL_SCALE,
    nullable: false,
  })
  triggerPrice: string;

  @Column({
    name: 'trigger_time',
    type: 'bigint',
    nullable: false,
  })
  triggerTime: string;

  @Column({
    name: 'status',
    type: 'smallint',
    default: 1,
    nullable: false,
  })
  status: number;

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
    const time = currentMilliTime();
    this.createTime = time;
    this.updateTime = time;
  }

  @BeforeUpdate()
  updateDates() {
    this.updateTime = currentMilliTime();
  }
}
