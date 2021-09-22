import { IsString, IsUrl, Length } from 'class-validator';

export class CreateResponseInput {
  @IsString()
  readonly date: string;

  @IsString()
  readonly startTime: string;

  @IsString()
  readonly endTime: string;

  @IsUrl()
  readonly link: string;

  @IsString()
  @Length(10, 500)
  readonly message: string;
}

export class CreateResponseOutput {}
