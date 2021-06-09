import { BaseHttpError } from './base-http-error';

export class BadRequest extends BaseHttpError {
  constructor(error: string) {
    super(400, error);
  }
}
