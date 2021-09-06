import { IsEmail, IsString, Length } from 'class-validator';
import { CreateAccountOutput } from './create-account.dto';

export class LoginInput {
  @IsEmail()
  email: string;

  @IsString()
  @Length(4, 100)
  password: string;
}

export class LoginOutput extends CreateAccountOutput {}
