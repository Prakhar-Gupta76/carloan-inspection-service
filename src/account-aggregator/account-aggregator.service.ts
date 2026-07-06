import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ApiResponseHelper } from '../common/helpers/api-response.helper';
import { AccountAggregatorRequestDto } from './dto/account-aggregator-request.dto';
import {
  AccountAggregatorRecord,
  AccountAggregatorResponseData,
} from './types/account-aggregator-record.type';

@Injectable()
export class AccountAggregatorService {
  getBankStatement(accountAggregatorRequestDto: AccountAggregatorRequestDto) {
    try {
      const {
        customer: { mobile_number, pan },
        consent: { data_range },
      } = accountAggregatorRequestDto;

      const record = this.getRecords().find(
        (accountAggregatorRecord) =>
          accountAggregatorRecord.mobile_number === mobile_number &&
          accountAggregatorRecord.pan === pan,
      );

      if (!record) {
        throw new NotFoundException(ApiResponseHelper.notFound());
      }

      const responseData: AccountAggregatorResponseData = {
        account: record.bank_details.account,
        transactions: this.filterTransactionsByDateRange(
          record.bank_details.transactions,
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
    const filePath = join(__dirname, 'data', 'account-aggregator.sample.json');
    const fileContent = readFileSync(filePath, 'utf8');
    const normalizedFileContent = fileContent.replace(/^\uFEFF/, '');

    return JSON.parse(normalizedFileContent) as AccountAggregatorRecord[];
  }

  private filterTransactionsByDateRange(
    transactions: AccountAggregatorRecord['bank_details']['transactions'],
    from: string,
    to: string,
  ) {
    const fromTime = new Date(from).getTime();
    const toTime = new Date(to).getTime();

    return transactions.filter((transaction) => {
      const transactionTime = new Date(transaction.date).getTime();

      return transactionTime >= fromTime && transactionTime <= toTime;
    });
  }
}
