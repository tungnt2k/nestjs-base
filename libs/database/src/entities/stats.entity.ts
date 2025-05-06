import { ZERO_VALUE } from '@app/common/utils/number.util';
import { currentMilliTime } from '@app/common/utils/utils';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn } from 'typeorm';

import { DECIMAL_PRECISION, DECIMAL_SCALE } from '../constant';

@Entity('stats')
export class Stats {
  @PrimaryColumn({
    type: 'varchar',
    name: 'key',
    length: '255',
    nullable: false,
  })
  key: string;

  @PrimaryColumn({
    type: 'bigint',
    name: 'time',
    nullable: false,
  })
  time: string;

  @Column({
    name: 'value',
    type: 'decimal',
    precision: DECIMAL_PRECISION,
    scale: DECIMAL_SCALE,
    nullable: false,
    default: ZERO_VALUE,
  })
  value: string;

  @Column({
    name: 'last_sync_id',
    type: 'bigint',
    nullable: true,
  })
  lastSyncId: string;

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
