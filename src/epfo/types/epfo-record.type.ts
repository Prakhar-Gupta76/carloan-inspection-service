export type PfCredit = {
  amount: number;
  company: string;
  date: string;
};

export type EpfoRecord = {
  mobile_number: string;
  pan: string;
  name: string;
  pf_credits: PfCredit[];
};

export type EmploymentCheckResponseData = {
  name: string;
  pf_credits: PfCredit[];
};
