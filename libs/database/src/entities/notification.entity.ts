import { currentMilliTime } from '@app/common/utils/utils';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notification')
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  @PrimaryColumn('bigint')
  id: string;

  @Column({
    name: 'receiver_id',
    type: 'bigint',
    nullable: false,
  })
  receiverId: string;

  @Column({
    name: 'receiver_type',
    type: 'varchar',
    length: '25',
    nullable: false,
  })
  receiverType: string;

  @Column({
    name: 'is_read',
    type: 'boolean',
    default: false,
  })
  isRead: boolean;

  @Column({
    name: 'title',
    type: 'text',
    nullable: false,
  })
  title: string;

  @Column({
    name: 'content',
    type: 'text',
    nullable: false,
  })
  content: string;

  @Column({
    name: 'meta_data',
    type: 'text',
    nullable: true,
  })
  metaData: string;

  @Column({
    name: 'notify_resource_type',
    type: 'varchar',
    length: '25',
    nullable: false,
  })
  notifyResourceType: string;

  @Column({
    name: 'notify_resource_id',
    type: 'bigint',
    nullable: false,
  })
  notifyResourceId: string;

  @Column({
    name: 'notify_type',
    type: 'varchar',
    length: '25',
    nullable: false,
  })
  notifyType: string;

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
