import { currentMilliTime } from '@app/common/utils/utils';
import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('delay_trading_member')
export class DelayTradingMember {
  @PrimaryColumn({
    type: 'bigint',
    name: 'user_id',
  })
  userId: string;

  @PrimaryColumn({
    type: 'bigint',
    name: 'group_id',
  })
  groupId: string;

  @Column({
    name: 'create_time',
    type: 'bigint',
    nullable: false,
  })
  createTime: string;

  @BeforeInsert()
  createDates() {
    this.createTime = currentMilliTime();
  }
}
