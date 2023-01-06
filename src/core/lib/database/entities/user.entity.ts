import { BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TokenEntity } from './token.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'email',
    length: 60,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    name: 'nick_name',
    length: 100,
    nullable: false,
    unique: true,
  })
  nickName: string;

  @Column({
    type: 'text',
    name: 'password',
    nullable: true,
  })
  password: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @BeforeUpdate()
  updateDates() {
    this.updatedAt = new Date();
  }

  @OneToMany(() => TokenEntity, (token) => token.user)
  tokens: TokenEntity[];
}
