export const RESPONSE_STATUS = {
  OK: 'ok',
  NOT_FOUND: 'not found',
  ERROR: 'error',
} as const;

export const RESPONSE_MESSAGES = {
  RECORD_DOES_NOT_EXIST: 'Record does not exist. Check the provided fields',
  SOMETHING_WENT_WRONG: 'Some error occurred. Try again later.',
} as const;
