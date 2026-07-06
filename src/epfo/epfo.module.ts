import { Module } from '@nestjs/common';
import { EpfoController } from './epfo.controller';
import { EpfoService } from './epfo.service';

@Module({
  controllers: [EpfoController],
  providers: [EpfoService],
})
export class EpfoModule {}
