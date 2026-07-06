import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { EmploymentCheckRequestDto } from './dto/employment-check-request.dto';
import { EpfoService } from './epfo.service';

@Controller('api/v1')
export class EpfoController {
  constructor(private readonly epfoService: EpfoService) {}

  @Post('employment-check')
  checkEmployment(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    employmentCheckRequestDto: EmploymentCheckRequestDto,
  ) {
    return this.epfoService.checkEmployment(employmentCheckRequestDto);
  }
}
