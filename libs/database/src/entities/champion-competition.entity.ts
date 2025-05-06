import { ZERO_VALUE } from '@app/common/utils/number.util';
import { currentMilliTime } from '@app/common/utils/utils';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { DECIMAL_PRECISION, DECIMAL_SCALE } from '../constant';

@Entity('champion_competition')
export class ChampionCompetition {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    unsigned: true,
  })
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'start_time',
    type: 'bigint',
    nullable: false,
  })
  startTime: string;

  @Column({
    name: 'end_time',
    type: 'bigint',
    nullable: false,
  })
  endTime: string;

  @Column({
    name: 'max_competitor',
    type: 'bigint',
    nullable: true,
  })
  maxCompetitor: string;

  @Column({
    name: 'total_prize',
    type: 'decimal',
    precision: DECIMAL_PRECISION,
    scale: DECIMAL_SCALE,
    nullable: false,
  })
  totalPrize: string;

  @Column({
    name: 'min_trade_volume',
    type: 'decimal',
    precision: DECIMAL_PRECISION,
    scale: DECIMAL_SCALE,
    default: ZERO_VALUE,
  })
  minTradeVolume: string;

  @Column({
    name: 'num_of_winner',
    type: 'bigint',
    nullable: false,
  })
  numOfWinner: string;

  @Column({
    name: 'prize',
    type: 'jsonb',
    nullable: false,
    default: "'{}'",
  })
  prize: Record<number, string>;

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
