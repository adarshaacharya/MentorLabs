/**
 * validates id or throw error
 */

import { isUUID } from 'class-validator';
import { BadRequest } from '../exceptions';

// export function validateIdOrThrow(num: any): number {
//   if (isNaN(num) || num > Number.MAX_SAFE_INTEGER || num <= 0) {
//     throw new BadRequest('Invalid ID type. Check it again');
//   }
//   return parseInt(num, 10);
// }

export function validateIdOrThrow(id: string | undefined) {
  if (id && isUUID(id)) {
    return id;
  }
  throw new BadRequest('Invalid ID type. Check it again');
}
