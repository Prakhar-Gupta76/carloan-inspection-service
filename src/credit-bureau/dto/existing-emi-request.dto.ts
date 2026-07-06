import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayContains,
  IsArray,
  IsEnum,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { CreditBureauDataType } from '../enums/credit-bureau.enum';

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

class ConsentDto {
  @IsString()
  purpose: string;

  @IsString()
  status: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(1)
  @ArrayContains([CreditBureauDataType.EXISTING_EMIS])
  @IsEnum(CreditBureauDataType, { each: true })
  data_types: CreditBureauDataType[];
}

export class ExistingEmiRequestDto {
  @ValidateNested()
  @Type(() => CustomerDto)
  customer: CustomerDto;

  @ValidateNested()
  @Type(() => ConsentDto)
  consent: ConsentDto;
}
