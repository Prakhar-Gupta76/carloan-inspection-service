import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ApiResponseHelper } from '../common/helpers/api-response.helper';
import { CreditScoreRequestDto } from './dto/credit-score-request.dto';
import { ExistingEmiRequestDto } from './dto/existing-emi-request.dto';
import {
  CreditBureauRecord,
  CreditScoreResponseData,
  ExistingEmiResponseData,
} from './types/credit-bureau-record.type';

@Injectable()
export class CreditBureauService {
  getCreditScore(creditScoreRequestDto: CreditScoreRequestDto) {
    try {
      const record = this.getRecord(
        creditScoreRequestDto.customer.mobile_number,
        creditScoreRequestDto.customer.pan,
      );

      const responseData: CreditScoreResponseData = {
        name: record.name,
        credit_score: record.credit_score,
      };

      return ApiResponseHelper.ok(responseData);
    } catch (error) {
      return this.handleError(error);
    }
  }

  getExistingEmi(existingEmiRequestDto: ExistingEmiRequestDto) {
    try {
      const record = this.getRecord(
        existingEmiRequestDto.customer.mobile_number,
        existingEmiRequestDto.customer.pan,
      );

      const responseData: ExistingEmiResponseData = {
        name: record.name,
        existing_emis_amount: record.existing_emis_amount,
      };

      return ApiResponseHelper.ok(responseData);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private getRecord(mobileNumber: string, pan: string) {
    const record = this.getRecords().find(
      (creditBureauRecord) =>
        creditBureauRecord.mobile_number === mobileNumber &&
        creditBureauRecord.pan === pan,
    );

    if (!record) {
      throw new NotFoundException(ApiResponseHelper.notFound());
    }

    return record;
  }

  private getRecords() {
    const filePath = join(__dirname, 'data', 'credit-bureau.sample.json');
    const fileContent = readFileSync(filePath, 'utf8');
    const normalizedFileContent = fileContent.replace(/^\uFEFF/, '');

    return JSON.parse(normalizedFileContent) as CreditBureauRecord[];
  }

  private handleError(error: unknown): never {
    if (error instanceof NotFoundException) {
      throw error;
    }

    throw new InternalServerErrorException(ApiResponseHelper.error());
  }
}
