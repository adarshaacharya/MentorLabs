import { Length, IsEmail, IsString, IsEnum } from 'class-validator';
import { ROLE } from '../../../common/enums/role.enum';

export class CreateAccountInput {
  @IsString()
  @Length(4, 20)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(4, 100)
  password: string;

  @IsEnum(ROLE)
  role: ROLE;
}

export class CreateAccountOutput {
  token: string;
}
