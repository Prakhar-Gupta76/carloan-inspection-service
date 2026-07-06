import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import {
  AccountAggregatorDataType,
  ConsentFrequency,
} from '../enums/account-aggregator.enum';

class CustomerDto {
  @IsString()
  @Matches(/^\d{10}$/, {
    message: 'mobile_number must be a 10 digit number',
  })
  mobile_number: string;

  @IsString()
  @Matches(/^[A-Z]{5}\d{4}[A-Z]$/, {
    message: 'pan must be like ABCDE1234F',
  })
  pan: string;
}

class DataRangeDto {
  @IsDateString()
  from: string;

  @IsDateString()
  to: string;
}

class ConsentDto {
  @IsString()
  purpose: string;

  @IsString()
  status: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(1)
  @IsEnum(AccountAggregatorDataType, { each: true })
  data_types: AccountAggregatorDataType[];

  @ValidateNested()
  @Type(() => DataRangeDto)
  data_range: DataRangeDto;

  @IsEnum(ConsentFrequency)
  frequency: ConsentFrequency;
}

export class AccountAggregatorRequestDto {
  @ValidateNested()
  @Type(() => CustomerDto)
  customer: CustomerDto;

  @ValidateNested()
  @Type(() => ConsentDto)
  consent: ConsentDto;
}
