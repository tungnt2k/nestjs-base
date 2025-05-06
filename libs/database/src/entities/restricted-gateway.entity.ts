import { currentMilliTime } from '@app/common/utils/utils';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('restricted_gateway')
export class RestrictedGateway {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    unsigned: true,
  })
  id: string;

  @Column({
    name: 'country_code',
    type: 'varchar',
    length: '20',
    nullable: false,
  })
  countryCode: string;

  @Column({
    name: 'payment_service',
    type: 'varchar',
    length: '50',
    nullable: false,
  })
  paymentService: string;

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
