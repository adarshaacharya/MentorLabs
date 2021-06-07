import { BaseHttpError } from './base-http-error';

export class NotFound extends BaseHttpError {
  constructor(error: string) {
    super(404, error);
  }
}
