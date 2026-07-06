import { Module } from '@nestjs/common';
import { CreditBureauController } from './credit-bureau.controller';
import { CreditBureauService } from './credit-bureau.service';

@Module({
  controllers: [CreditBureauController],
  providers: [CreditBureauService],
})
export class CreditBureauModule {}
