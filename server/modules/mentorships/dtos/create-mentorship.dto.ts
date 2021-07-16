import { IsIn, IsString, Length } from 'class-validator';
import { Status } from '../../../common/enums/status.enum';

export class CreateMentorshipInput {
  readonly mentorId: number;

  readonly menteeId: number;

  @IsString()
  @Length(10, 500)
  readonly background: string;

  @IsString()
  @Length(10, 500)
  readonly expectation: string;

  @IsString()
  @Length(10, 500)
  readonly message: string;

  @IsString()
  @IsIn(Object.values(Status))
  readonly status: Status;
}

export class CreateMentorshipOutput {
  ok: boolean;
}
