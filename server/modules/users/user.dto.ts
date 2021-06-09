import { User } from './user.entity';

export interface IUserInputDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUserResponseDTO {
  user: User;
  token: string;
}
