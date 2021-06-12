import { generateJwtToken } from '../../common/token/generate-jwt.ts';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BadRequest, Unauthorized } from '../../common/exceptions';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';
import { User } from './user.entity';
import { UserRepository } from './repositories/users.repository';
import { LoginInput, LoginOutput } from './dtos/login.dto';

@Service()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  public async createAccount({ name, email, password, role }: CreateAccountInput): Promise<CreateAccountOutput> {
    if (await this.userRepository.findOneByEmail(email)) {
      throw new BadRequest('User with provided email already exists');
    }
    const user = await this.userRepository.save(this.userRepository.create({ name, email, password, role }));

    const token = generateJwtToken({ id: user.id, role: user.role });
    return { token };
  }

  public async login({ email, password }: LoginInput): Promise<LoginOutput> {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new Unauthorized("User with given email doesn't exists");
    }

    const passwordCorrect = await user.checkPassword(password);
    if (!passwordCorrect) {
      throw new Unauthorized('Invalid email or password');
    }

    const token = generateJwtToken({ id: user.id, role: user.role });
    return { token };
  }
}
