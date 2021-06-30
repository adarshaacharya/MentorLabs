import { enumToList } from 'utils/enum-list';

export enum ROLE {
  Student = 'STUDENT',
  Teacher = 'TEACHER',
}

// convert above enum to array
export const USER_ROLES = enumToList(ROLE); // STUDENT, TEACHER

USER_ROLES.map((x) => x);
