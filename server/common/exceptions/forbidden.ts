import { BaseHttpError } from './base-http-error';

class Forbidden extends BaseHttpError {
  constructor(error: string) {
    super(403, error);
  }
}
export default Forbidden;