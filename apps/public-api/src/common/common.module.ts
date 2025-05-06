import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CommonController } from './common.controller';

@Module({
  imports: [ConfigModule],
  controllers: [CommonController],
})
export class CommonModule {}
