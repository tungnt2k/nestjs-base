import { currentMilliTime } from '@app/common/utils/utils';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('country')
export class Country {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    unsigned: true,
  })
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: '255',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'code',
    type: 'varchar',
    length: '20',
    nullable: false,
  })
  code: string;

  @Column({
    name: 'icon',
    type: 'text',
    nullable: true,
  })
  icon: string;

  @Column({
    name: 'status',
    type: 'smallint',
    default: 1,
    nullable: false,
  })
  status: number;

  @Column({
    name: 'order',
    type: 'int',
    default: 0,
    nullable: false,
  })
  order: number;

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
