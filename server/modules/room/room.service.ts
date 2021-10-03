import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { NotFound } from '../../common/exceptions';
import { CreateRoomInput } from './dtos/creat-room.dto';
import { Room } from './entities/room.entity';

@Service()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  public async createRoom(creatorId: string, createRoomInput: CreateRoomInput) {
    const { title } = createRoomInput;

    const room = await this.roomRepository.save(this.roomRepository.create({ title, creatorId }));

    return {
      id: room.id,
      title: room.title,
    };
  }

  public async joinRoom(roomId: string) {
    const room = await this.findRoomById(roomId);

    if (!room) {
      throw new NotFound("Room with given id doesn't exists.");
    }

    return room;
  }

  public async findRoomById(id: string) {
    return this.roomRepository.findOne(id);
  }
}
