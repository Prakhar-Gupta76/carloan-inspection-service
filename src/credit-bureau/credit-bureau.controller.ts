import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreditBureauService } from './credit-bureau.service';
import { CreditScoreRequestDto } from './dto/credit-score-request.dto';
import { ExistingEmiRequestDto } from './dto/existing-emi-request.dto';

@Controller('api/v1')
export class CreditBureauController {
  constructor(private readonly creditBureauService: CreditBureauService) {}

  @Post('get-credit-score')
  getCreditScore(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    creditScoreRequestDto: CreditScoreRequestDto,
  ) {
    return this.creditBureauService.getCreditScore(creditScoreRequestDto);
  }

  @Post('get-existing-emi')
  getExistingEmi(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    existingEmiRequestDto: ExistingEmiRequestDto,
  ) {
    return this.creditBureauService.getExistingEmi(existingEmiRequestDto);
  }
}
