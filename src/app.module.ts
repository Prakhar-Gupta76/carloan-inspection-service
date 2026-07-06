import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountAggregatorModule } from './account-aggregator/account-aggregator.module';
import { CreditBureauModule } from './credit-bureau/credit-bureau.module';
import { EpfoModule } from './epfo/epfo.module';

@Module({
  imports: [ConfigModule.forRoot(),
    AccountAggregatorModule, EpfoModule, CreditBureauModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
