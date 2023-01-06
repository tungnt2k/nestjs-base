import BN from 'bignumber.js';
import { EntityRepository, Repository } from 'typeorm';

import { LoggerService } from '../../logger';
import { UserEntity } from '../entities';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  logger = new LoggerService(UserRepository.name);

  async checkExistEmail(email: string): Promise<boolean> {
    const user = await this.findOne({ email });
    return !!user;
  }

  async getUserById(id: number): Promise<UserEntity> {
    return this.findOne({ id });
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return this.findOne({ email });
  }

  async updateUser(user: UserEntity, updateData: Partial<UserEntity>): Promise<UserEntity> {
    return this.save({ ...user, ...updateData });
  }
}
