// base class for all errors
import { ValidationError } from 'class-validator';

export interface IBaseHttpError {
  statusCode: number;
  message: ValidationError | string;
  ok: boolean;
}

export class BaseHttpError implements IBaseHttpError {
  public statusCode: number;
  public message: string;
  public ok: boolean;

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.ok = false;
  }
}
