import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ApiResponseHelper } from '../common/helpers/api-response.helper';
import { EmploymentCheckRequestDto } from './dto/employment-check-request.dto';
import {
  EmploymentCheckResponseData,
  EpfoRecord,
} from './types/epfo-record.type';

@Injectable()
export class EpfoService {
  checkEmployment(employmentCheckRequestDto: EmploymentCheckRequestDto) {
    try {
      const {
        customer: { mobile_number, pan },
        consent: { data_range },
      } = employmentCheckRequestDto;

      const record = this.getRecords().find(
        (epfoRecord) =>
          epfoRecord.mobile_number === mobile_number && epfoRecord.pan === pan,
      );

      if (!record) {
        throw new NotFoundException(ApiResponseHelper.notFound());
      }

      const responseData: EmploymentCheckResponseData = {
        name: record.name,
        pf_credits: this.filterPfCreditsByDateRange(
          record.pf_credits,
          data_range.from,
          data_range.to,
        ),
      };

      return ApiResponseHelper.ok(responseData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(ApiResponseHelper.error());
    }
  }

  private getRecords() {
    const filePath = join(__dirname, 'data', 'epfo.sample.json');
    const fileContent = readFileSync(filePath, 'utf8');
    const normalizedFileContent = fileContent.replace(/^\uFEFF/, '');

    return JSON.parse(normalizedFileContent) as EpfoRecord[];
  }

  private filterPfCreditsByDateRange(
    pfCredits: EpfoRecord['pf_credits'],
    from: string,
    to: string,
  ) {
    const fromTime = new Date(from).getTime();
    const toTime = new Date(to).getTime();

    return pfCredits.filter((pfCredit) => {
      const pfCreditTime = new Date(pfCredit.date).getTime();

      return pfCreditTime >= fromTime && pfCreditTime <= toTime;
    });
  }
}
