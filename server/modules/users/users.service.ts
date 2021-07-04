import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BadRequest, Unauthorized } from '../../common/exceptions';
import { generateJwtToken } from '../../common/token/generate-jwt.ts';
import { Gravatar } from '../../services/Gravatar';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { UserRepository } from './repositories/users.repository';
import { User } from './user.entity';

@Service()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  public async me(id: number | undefined) {
    const user = await this.userRepository.findOne({
      select: ['id', 'name', 'email', 'role', 'avatar'],
      where: { id },
    });

    return user;
  }

  public async createAccount({ name, email, password, role }: CreateAccountInput) {
    if (await this.userRepository.findOneByEmail(email)) {
      throw new BadRequest('User with provided email already exists');
    }

    const avatar = Gravatar.generateUrl(email);
    const user = await this.userRepository.save(this.userRepository.create({ name, email, password, role, avatar }));

    const token = generateJwtToken({ id: user.id, role: user.role });

    return { token, id: user.id, name, email, avatar, role };
  }

  public async login({ email, password }: LoginInput) {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new Unauthorized("User with given email doesn't exists");
    }

    const passwordCorrect = await user.checkPassword(password);
    if (!passwordCorrect) {
      throw new Unauthorized('Invalid email or password');
    }

    const token = generateJwtToken({ id: user.id, role: user.role });

    const { id, name, avatar, role } = user;
    return { token, id, name, email, avatar, role };
  }
}
