/**
 * validates id or throw error
 */

import { BadRequest } from 'common/exceptions';

function validateIdOrThrow(num: any): number {
  if (isNaN(num) || num > Number.MAX_SAFE_INTEGER || num <= 0) {
    throw new BadRequest('Invalid ID type. Check it again');
  }
  return parseInt(num);
}

export default validateIdOrThrow;
