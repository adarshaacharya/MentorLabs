import { ValidationError } from 'joi';

export interface IBaseHttpError {
  statusCode: number;
  error: ValidationError | string;
}

export class BaseHttpError implements IBaseHttpError {
  public statusCode: number;
  public error: string;

  constructor(statusCode: number, error: string) {
    this.statusCode = statusCode;
    this.error = error;
  }
}
