import { ZERO_VALUE } from '@app/common/utils/number.util';
import { currentMilliTime } from '@app/common/utils/utils';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn } from 'typeorm';

import { DECIMAL_PRECISION, DECIMAL_SCALE } from '../constant';

@Entity('user')
export class User {
  @PrimaryColumn({
    type: 'bigint',
    name: 'id',
    unsigned: true,
  })
  id: string;

  @Column({
    name: 'email',
    type: 'varchar',
    nullable: false,
    length: 60,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: true,
    length: 60,
  })
  password: string;

  @Column({
    name: 'last_login_time',
    type: 'bigint',
    nullable: true,
  })
  lastLoginTime: string;

  @Column({
    name: 'nickname',
    type: 'varchar',
    nullable: false,
    length: 255,
    unique: true,
  })
  nickname: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    nullable: true,
    length: 100,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    nullable: true,
    length: 100,
  })
  lastName: string;

  @Column({
    name: 'date_of_birth',
    type: 'date',
    nullable: true,
  })
  dateOfBirth: string;

  @Column({
    name: 'country',
    type: 'varchar',
    nullable: true,
    length: 50,
  })
  country: string;

  @Column({
    name: 'currency',
    type: 'varchar',
    nullable: true,
    length: 10,
  })
  currency: string;

  @Column({
    name: 'address',
    type: 'varchar',
    nullable: true,
    length: 255,
  })
  address: string;

  @Column({
    name: 'avatar',
    type: 'text',
    nullable: true,
  })
  avatar: string;

  @Column({
    name: 'active',
    type: 'boolean',
    default: false,
  })
  active: boolean;

  @Column({
    name: 'verified',
    type: 'boolean',
    default: false,
  })
  verified: boolean;

  @Column({
    name: 'verify_token',
    type: 'text',
    nullable: true,
  })
  verifyToken: string;

  @Column({
    name: 'ref_code',
    type: 'varchar',
    nullable: true,
    length: 20,
  })
  refCode: string;

  @Column({
    name: 'parent_id',
    nullable: true,
    type: 'bigint',
  })
  parentId: string;

  @Column({
    name: 'affiliate_revenue_level',
    nullable: false,
    type: 'smallint',
    default: 1,
  })
  affiliateRevenueLevel: number;

  @Column({
    name: 'affiliate_turnover_level',
    nullable: false,
    type: 'smallint',
    default: 1,
  })
  affiliateTurnoverLevel: number;

  @Column({
    name: 'first_deposit_tx_time',
    type: 'bigint',
    nullable: true,
  })
  firstDepositTxTime: string;

  @Column({
    name: 'affiliate_ratio',
    type: 'decimal',
    precision: DECIMAL_PRECISION,
    scale: DECIMAL_SCALE,
    default: ZERO_VALUE,
    nullable: false,
  })
  affiliateRatio: string;

  @Column({
    name: 'unlock_withdraw_affiliate',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  unlockWithdrawAffiliate: boolean;

  @Column({
    name: 'secret',
    type: 'text',
    nullable: true,
  })
  secret: string;

  @Column({
    name: 'active_2fa',
    nullable: true,
    type: 'boolean',
    default: false,
  })
  active2fa: boolean;

  @Column({
    name: 'verify_withdraw_2fa',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  verifyWithdraw2fa: boolean;

  @Column({
    name: 'verify_login_2fa',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  verifyLogin2fa: boolean;

  @Column({
    name: 'block_withdrawal',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  blockWithdrawal: boolean;

  @Column({
    name: 'kyc',
    nullable: false,
    type: 'boolean',
    default: false,
  })
  kyc: boolean;

  @Column({
    name: 'is_demo',
    nullable: false,
    type: 'boolean',
    default: false,
  })
  isDemo: boolean;

  @Column({
    name: 'ban_reason',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  banReason: string;

  @Column({
    name: 'ban_time',
    type: 'bigint',
    nullable: true,
  })
  banTime: string;

  @Column({
    name: 'level',
    type: 'smallint',
    nullable: false,
    default: 1,
  })
  level: number;

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
