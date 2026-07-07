import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AccountAggregatorService } from './account-aggregator.service';
import { AccountAggregatorRequestDto } from './dto/account-aggregator-request.dto';

@Controller('api/v1/salary-verification')
export class AccountAggregatorController {
  constructor(
    private readonly accountAggregatorService: AccountAggregatorService,
  ) { }

  @Post()
  getBankStatement(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    accountAggregatorRequestDto: AccountAggregatorRequestDto,
  ) {
    return this.accountAggregatorService.getBankStatement(
      accountAggregatorRequestDto,
    );
  }
}
