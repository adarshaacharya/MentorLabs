// base class for all errors
import { ValidationError } from 'class-validator';

export interface IBaseHttpError {
  statusCode: number;
  error: ValidationError | string;
  ok: boolean;
}

export class BaseHttpError implements IBaseHttpError {
  public statusCode: number;
  public error: string;
  public ok: boolean;

  constructor(statusCode: number, error: string) {
    this.statusCode = statusCode;
    this.error = error;
    this.ok = false;
  }
}
