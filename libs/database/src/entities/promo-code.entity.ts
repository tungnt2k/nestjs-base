import { currentMilliTime } from '@app/common/utils/utils';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('promo_code')
export class PromoCode {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    unsigned: true,
  })
  id: string;

  @Column({
    name: 'code',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  code: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'description',
    length: 255,
    nullable: true,
  })
  description: string;

  @Column({
    name: 'status',
    type: 'smallint',
    default: 1,
    nullable: false,
  })
  status: number;

  @Column({
    name: 'used_count',
    type: 'bigint',
    default: 0,
    nullable: false,
  })
  usedCount: string;

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
