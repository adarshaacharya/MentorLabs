import { IsString } from 'class-validator';

export class JoinRoomInput {
  @IsString()
  id: string;
}
