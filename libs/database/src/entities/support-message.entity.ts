import { currentMilliTime } from '@app/common/utils/utils';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('support_message')
export class SupportMessage {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    unsigned: true,
  })
  id: string;

  @Column({
    name: 'ticket_id',
    type: 'bigint',
    nullable: false,
  })
  ticketId: string;

  @Column({
    name: 'sender_id',
    type: 'bigint',
    nullable: false,
  })
  senderId: string;

  @Column({
    name: 'sender_name',
    type: 'varchar',
    length: '255',
    nullable: false,
  })
  senderName: string;

  @Column({
    name: 'is_user',
    type: 'boolean',
    nullable: false,
  })
  isUser: boolean;

  @Column({
    name: 'content',
    type: 'text',
    nullable: false,
  })
  content: string;

  @Column({
    name: 'type',
    type: 'smallint',
    nullable: false,
  })
  type: number;

  @Column({
    name: 'parent_id',
    type: 'bigint',
    nullable: true,
    default: 0,
  })
  parentId: string;

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

  childs?: Array<SupportMessage>;
}
