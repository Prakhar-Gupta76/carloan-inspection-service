import {
  RESPONSE_MESSAGES,
  RESPONSE_STATUS,
} from '../constants/response.constants';

export class ApiResponseHelper {
  static ok<T>(data: T) {
    return {
      status: RESPONSE_STATUS.OK,
      data,
    };
  }

  static notFound() {
    return {
      status: RESPONSE_STATUS.NOT_FOUND,
      message: RESPONSE_MESSAGES.RECORD_DOES_NOT_EXIST,
    };
  }

  static error() {
    return {
      status: RESPONSE_STATUS.ERROR,
      message: RESPONSE_MESSAGES.SOMETHING_WENT_WRONG,
    };
  }
}
