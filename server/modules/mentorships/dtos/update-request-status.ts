import { IsEnum } from 'class-validator';
import { Status } from '../../../common/enums';

export class UpdateRequestStatusInput {
  @IsEnum(Status)
  readonly status: Status;
}
