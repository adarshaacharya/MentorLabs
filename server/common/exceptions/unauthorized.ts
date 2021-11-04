import { BaseHttpError } from './base-http-error';

export class Unauthorized extends BaseHttpError {
  constructor(error: string) {
    super(401, error);
  }
}
