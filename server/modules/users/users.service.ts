import { generateJwtToken } from '../../common/token/generate-jwt.ts';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BadRequest } from '../../common/exceptions';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-user.dto';
import { User } from './user.entity';

@Service()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createAccount({ name, email, password, role }: CreateAccountInput): Promise<CreateAccountOutput> {
    if (await this.findOneByEmail(email)) {
      throw new BadRequest('User with provided email already exists');
    }
    const user = await this.userRepository.save(this.userRepository.create({ name, email, password, role }));

    const token = generateJwtToken({ id: user.id, role: user.role });
    return { token };
  }

  public async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }
}
