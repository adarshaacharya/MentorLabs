import { ValidationError } from 'joi';

export interface IBaseHttpError {
  statusCode: number;
  error: ValidationError | string;
  ok : boolean
}

export class BaseHttpError implements IBaseHttpError {
  public statusCode: number;
  public error: string;
  public ok : boolean

  constructor(statusCode: number, error: string) {
    this.statusCode = statusCode;
    this.error = error;
    this.ok = false
  }
}
