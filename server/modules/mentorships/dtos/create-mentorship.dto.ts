import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { Status } from '../../../common/enums/status.enum';

export class CreateMentorshipInput {
  readonly mentorId: string;

  readonly menteeId: string;

  @IsString()
  @Length(5, 50)
  readonly title: string;

  @IsString()
  @Length(10, 1000)
  readonly background: string;

  @IsString()
  @Length(10, 1000)
  readonly expectation: string;

  @IsString()
  @Length(10, 1000)
  readonly message: string;

  @IsOptional()
  @IsEnum(() => Status)
  readonly status: Status;
}

export class CreateMentorshipOutput {}
