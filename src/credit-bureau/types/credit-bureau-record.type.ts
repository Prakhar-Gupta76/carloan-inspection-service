export type CreditBureauRecord = {
  mobile_number: string;
  pan: string;
  name: string;
  credit_score: number;
  existing_emis_amount: number;
};

export type CreditScoreResponseData = {
  name: string;
  credit_score: number;
};

export type ExistingEmiResponseData = {
  name: string;
  existing_emis_amount: number;
};
