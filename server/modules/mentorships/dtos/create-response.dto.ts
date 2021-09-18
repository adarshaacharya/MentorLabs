import { IsDateString, IsMilitaryTime, IsString, IsUrl, Length } from 'class-validator';

export class CreateResponseInput {
  @IsDateString()
  readonly date: Date;

  @IsMilitaryTime()
  readonly startTime: string;

  @IsMilitaryTime()
  readonly endTime: string;

  @IsUrl()
  readonly link: string;

  @IsString()
  @Length(10, 500)
  readonly message: string;
}

export class CreateResponseOutput {}
