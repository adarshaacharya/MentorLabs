import { isUUID } from 'class-validator';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BadRequest, NotFound } from '../../common/exceptions';
import { User } from '../users/entities/user.entity';
import { UserRepository } from '../users/repositories/users.repository';
import { CreateRoomInput } from './dtos/create-room.dto';
import { JoinRoomInput } from './dtos/join-room.dto';

import { Room } from './entities/room.entity';

@Service()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,

    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  public async createRoom(creatorId: string, createRoomInput: CreateRoomInput) {
    const { title, participantId } = createRoomInput;

    if (participantId) {
      const participant = await this.userRepository.findOne({ id: participantId });

      if (!participant) {
        throw new NotFound("Participant with given id doesn't exists.");
      }
    }

    const room = await this.roomRepository.save(this.roomRepository.create({ title, creatorId, participantId }));

    return {
      id: room.id,
      title: room.title,
    };
  }

  public async joinRoom(userId: string, joinRoomInput: JoinRoomInput) {
    const { id } = joinRoomInput;

    if (!isUUID(id)) {
      throw new NotFound("Room with given id doesn't exists.");
    }

    const room = await this.findRoomById(id);

    if (!room) {
      throw new NotFound("Room with given id doesn't exists.");
    }

    if (room.participantId) {
      const checkPermission = room.creatorId === userId || room.participantId === userId;

      if (!checkPermission) {
        throw new BadRequest("You aren't permitted to enter into this room.");
      }
    }

    return {
      id: room.id,
      title: room.title,
    };
  }

  public async findRoomById(id: string) {
    return this.roomRepository.findOne(id);
  }
}
