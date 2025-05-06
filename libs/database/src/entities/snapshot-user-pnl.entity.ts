import { Column, Entity, PrimaryColumn } from 'typeorm';

import { DECIMAL_PRECISION, DECIMAL_SCALE } from '../constant';

@Entity('snapshot_user_pnl')
export class SnapshotUserPNL {
  @PrimaryColumn({
    type: 'bigint',
    name: 'user_id',
  })
  userId: string;

  @PrimaryColumn({
    type: 'bigint',
    name: 'time',
  })
  time: string;

  @Column({
    name: 'pnl',
    type: 'decimal',
    precision: DECIMAL_PRECISION,
    scale: DECIMAL_SCALE,
    nullable: false,
  })
  pnl: string;

  @Column({
    name: 'total_balance',
    type: 'decimal',
    precision: DECIMAL_PRECISION,
    scale: DECIMAL_SCALE,
    nullable: false,
  })
  totalBalance: string;
}
