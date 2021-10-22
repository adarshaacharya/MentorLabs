import { Length, IsEmail, IsString, IsEnum } from 'class-validator';
import { Role } from '../../../common/enums/role.enum';

export class CreateAccountInput {
  @IsString()
  @Length(4, 20)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(4, 100)
  password: string;

  @IsEnum(Role)
  role: Role;
}

export class CreateAccountOutput {
  token: string;
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}
