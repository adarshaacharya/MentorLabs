import { IsString, IsUUID, Length } from 'class-validator';

export class CreateResponseInput {
  @IsString()
  readonly date: string;

  @IsString()
  readonly startTime: string;

  @IsString()
  readonly endTime: string;

  @IsUUID()
  readonly roomId: string;

  @IsString()
  @Length(10, 500)
  readonly message: string;
}

export class CreateResponseOutput {}
