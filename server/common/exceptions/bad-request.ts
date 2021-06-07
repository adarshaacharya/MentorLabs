import { BaseHttpError } from './base-http-error';

class BadRequest extends BaseHttpError {
  constructor(error: string) {
    super(400, error);
  }
}

export default BadRequest;
