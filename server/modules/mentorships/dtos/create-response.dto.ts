import { IsDate, IsMilitaryTime, IsString, IsUrl, Length } from 'class-validator';

export class CreateReponseInput {
  @IsUrl()
  readonly link: string;

  @IsDate()
  readonly date: Date;

  @IsMilitaryTime()
  readonly startTime: string;

  @IsMilitaryTime()
  readonly endTime: string;

  @IsString()
  @Length(10, 500)
  readonly message: string;
}
