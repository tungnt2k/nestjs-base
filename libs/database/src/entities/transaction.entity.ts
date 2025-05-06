import {
  ACCOUNT_TYPE,
  BONUS_TYPE,
  PAYMENT_SERVICE,
  TRANSACTION_STATUS,
  TRANSACTION_TYPE,
} from '@app/common/enums/enum';
import { ZERO_VALUE } from '@app/common/utils/number.util';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { DECIMAL_PRECISION, DECIMAL_SCALE } from '../constant';

@Entity('transaction')
export class Transaction {
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
  type: TRANSACTION_TYPE;

  @Column({
    name: 'account_type',
    type: 'smallint',
    nullable: false,
    default: ACCOUNT_TYPE.LIVE,
  })
  accountType: ACCOUNT_TYPE;

  @Column({
    name: 'amount',
    type: 'decimal',
    nullable: false,
    precision: DECIMAL_PRECISION,
    scale: DECIMAL_SCALE,
  })
  amount: string;

  @Column({
    name: 'bonus',
    type: 'decimal',
    nullable: false,
    precision: DECIMAL_PRECISION,
    scale: DECIMAL_SCALE,
    default: ZERO_VALUE,
  })
  bonus: string;

  @Column({
    name: 'promo_code',
    type: 'varchar',
    length: '100',
    nullable: true,
  })
  promoCode: string;

  @Column({
    name: 'bonus_type',
    type: 'smallint',
    nullable: true,
  })
  bonusType: BONUS_TYPE;

  @Column({
    name: 'fee',
    type: 'decimal',
    nullable: false,
    precision: DECIMAL_PRECISION,
    scale: DECIMAL_SCALE,
    default: 0,
  })
  fee: string;

  @Column({
    name: 'currency',
    type: 'varchar',
    length: '20',
    nullable: false,
  })
  currency: string;

  @Column({
    name: 'ext_id',
    type: 'text',
    nullable: true,
  })
  extId: string;

  @Column({
    name: 'token',
    type: 'text',
    nullable: true,
  })
  token: string;

  @Column({
    name: 'destination',
    type: 'text',
    nullable: true,
  })
  destination: string;

  @Column({
    name: 'ext_svc',
    type: 'varchar',
    length: '50',
    nullable: true,
  })
  extSvc: PAYMENT_SERVICE;

  @Column({
    name: 'status',
    type: 'smallint',
    nullable: false,
  })
  status: TRANSACTION_STATUS;

  @Column({
    name: 'extra',
    type: 'json',
    nullable: true,
  })
  extra: JSON;

  @Column({
    name: 'confirm_time',
    nullable: true,
    type: 'bigint',
  })
  confirmTime: string;

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
  tx: { [x: string]: any };
}
