export type AccountDetails = {
  bank: string;
  accountType: string;
  maskedAccountNumber: string;
};

export type AccountTransaction = {
  date: string;
  description: string;
  type: string;
  amount: number;
};

export type AccountAggregatorRecord = {
  mobile_number: string;
  pan: string;
  bank_details: {
    account: AccountDetails;
    transactions: AccountTransaction[];
  };
};

export type AccountAggregatorResponseData = {
  account: AccountDetails;
  transactions: AccountTransaction[];
};
