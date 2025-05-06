import { currentMilliTime } from '@app/common/utils/utils';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('kyc')
export class KYC {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column({
    name: 'user_id',
    type: 'bigint',
    nullable: false,
  })
  userId: string;

  @Column({
    name: 'document_type',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  documentType: string;

  @Column({
    name: 'front_url',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  frontUrl: string;

  @Column({
    name: 'back_url',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  backUrl: string;

  @Column({
    name: 'additional_image',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  additionalImage: string;

  @Column({
    name: 'id_number',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  idNumber: string;

  @Column({
    name: 'note',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  note: string;

  @Column({
    name: 'reason',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  reason: string;

  @Column({
    name: 'status',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  status: number;

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
