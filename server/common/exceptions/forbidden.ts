import { BaseHttpError } from './base-http-error';

export class Forbidden extends BaseHttpError {
  constructor(error: string) {
    super(403, error);
  }
}