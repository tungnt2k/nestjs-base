import { currentMilliTime } from '@app/common/utils/utils';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('access_log')
export class AccessLog {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    unsigned: true,
  })
  id: string;

  @Column({
    name: 'user_id',
    nullable: false,
    type: 'bigint',
  })
  userId: string;

  @Column({
    name: 'ip',
    nullable: false,
    type: 'varchar',
    length: '45',
  })
  ip: string;

  @Column({
    name: 'create_time',
    nullable: false,
    type: 'bigint',
  })
  createTime: string;

  @BeforeInsert()
  createDates() {
    this.createTime = currentMilliTime();
  }
}
