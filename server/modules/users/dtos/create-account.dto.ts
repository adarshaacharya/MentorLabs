import { Length, IsEmail, IsString, IsEnum } from 'class-validator';
import { User, UserRole } from '../user.entity';

export class CreateAccountInput {
  @IsString()
  @Length(4, 20)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(4, 100)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}

export class CreateAccountOutput {
  token: string;
}

export type IUserView = Omit<User, 'password'>;
