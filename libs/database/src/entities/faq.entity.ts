import { currentMilliTime } from '@app/common/utils/utils';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('faq')
export class FAQ {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    unsigned: true,
  })
  id: string;

  @Column({
    name: 'question',
    type: 'text',
    nullable: false,
  })
  question: string;

  @Column({
    name: 'answer',
    type: 'text',
    nullable: false,
  })
  answer: string;

  @Column({
    name: 'related_question',
    type: 'varchar',
    length: '255',
    nullable: true,
  })
  relatedQuestion: string;

  @Column({
    name: 'order',
    type: 'int',
    nullable: true,
  })
  order: number;

  @Column({
    name: 'category',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  category: string;

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
