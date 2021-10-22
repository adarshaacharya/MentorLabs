import { IsString, Length } from 'class-validator';

export class CreateRoomInput {
  @IsString()
  @Length(2, 20)
  title: string;

  participantId?: string;
}
