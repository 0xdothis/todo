import { ApiError } from '../@types/';

export class ErrorHandler extends Error {
  statusCode: number;
  success: boolean;
  errors: object[];

  constructor({ success = false, message, statusCode, errors = [] }: ApiError) {
    super(message);

    this.statusCode = statusCode;
    this.success = success;
    this.errors = errors;

    //Object.setPrototypeOf(this, ErrorHandler.prototype)
  }
}
