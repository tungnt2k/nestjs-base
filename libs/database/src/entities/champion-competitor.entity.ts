import { ZERO_VALUE } from '@app/common/utils/number.util';
import { currentMilliTime } from '@app/common/utils/utils';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('champion_competitor')
export class ChampionCompetitor {
  @PrimaryColumn({
    name: 'champion_id',
    type: 'bigint',
  })
  championId: string;

  @PrimaryColumn({
    name: 'user_id',
    type: 'bigint',
  })
  userId: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'trade_count',
    type: 'bigint',
    nullable: false,
    default: ZERO_VALUE,
  })
  tradeCount: string;

  @Column({
    name: 'last_sync_id',
    type: 'bigint',
    nullable: true,
  })
  lastSyncId: string;

  @Column({
    name: 'rank',
    type: 'bigint',
    nullable: false,
    default: ZERO_VALUE,
  })
  rank: string;

  @Column({
    name: 'status',
    type: 'smallint',
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
