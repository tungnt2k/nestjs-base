import { currentMilliTime } from '@app/common/utils/utils';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('system_config')
export class SystemConfigEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column({
    name: 'key',
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: false,
  })
  key: string;

  @Column({
    name: 'type',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  type: string;

  @Column({
    name: 'value',
    type: 'varchar',
    length: 1000,
    nullable: false,
  })
  value: string;

  @Column({
    name: 'is_public',
    type: 'boolean',
    default: false,
    nullable: false,
  })
  isPublic: boolean;

  @Column({
    name: 'meta_data',
    type: 'json',
  })
  metaData: any;

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
