import { EntityRepository, Repository } from 'typeorm';

import { TokenEntity } from '../entities';

@EntityRepository(TokenEntity)
export class TokenRepository extends Repository<TokenEntity> {}
