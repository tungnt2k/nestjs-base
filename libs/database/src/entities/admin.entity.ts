import { ADMIN_ROLE } from '@app/common/enums/enum';
import { currentMilliTime } from '@app/common/utils/utils';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin')
export class Admin {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    unsigned: true,
  })
  id: string;

  @Column({
    name: 'email',
    type: 'varchar',
    unique: true,
    nullable: false,
    length: 255,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    name: 'last_login',
    type: 'bigint',
    nullable: false,
    default: 0,
  })
  lastLogin: string;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: true,
    length: 255,
  })
  name: string;

  @Column({
    name: 'role',
    type: 'varchar',
    nullable: false,
    length: 255,
    default: ADMIN_ROLE.ROOT_ADMIN,
  })
  role: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    nullable: true,
    length: 255,
  })
  phone: string;

  @Column({
    name: 'permission',
    type: 'jsonb',
    nullable: false,
    default: '[]',
  })
  permission: string[];

  @Column({
    name: 'status',
    type: 'smallint',
    nullable: false,
    default: 1,
  })
  status: number;

  @Column({
    name: 'create_time',
    type: 'bigint',
    nullable: false,
    default: 0,
  })
  createTime: string;

  @Column({
    name: 'update_time',
    type: 'bigint',
    nullable: false,
    default: 0,
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
