/**
 * validates id or throw error
 */

import { BadRequest } from '../exceptions';

function validateIdOrThrow(num: any): number {
  if (isNaN(num) || num > Number.MAX_SAFE_INTEGER || num <= 0) {
    throw new BadRequest('Invalid ID type. Check it again');
  }
  return parseInt(num, 10);
}

export default validateIdOrThrow;
