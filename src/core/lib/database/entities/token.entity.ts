import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from './user.entity';

@Entity('tokens')
export class TokenEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column({
    type: 'text',
    name: 'token',
    nullable: false,
  })
  token: string;

  @Column({
    type: 'varchar',
    name: 'type',
  })
  type: string;

  @Column({
    type: 'timestamp',
    name: 'expires',
    nullable: false,
  })
  expires: Date;

  @Column({
    type: 'boolean',
    name: 'blacklisted',
    default: false,
  })
  blacklisted: boolean;

  @Column({
    type: 'int',
    name: 'user_id',
  })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.tokens)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
