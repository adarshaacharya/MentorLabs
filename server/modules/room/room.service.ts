import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { CreateRoomInput } from './dtos/creat-room.dto';
import { Room } from './entities/room.entity';

@Service()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  public async createRoom(createRoomInput: CreateRoomInput) {
    const { title, creatorId } = createRoomInput;

    const room = await this.roomRepository.save(this.roomRepository.create({ title, creatorId }));
    return room;
  }
}
