import { BadRequest } from '../../common/exceptions';
import { User, UserRole } from './entities/user.entity';

interface IUserData {
  name: string;
  email: string;
  role: UserRole;
  password: string;
}

class UsersService {
  public async createAccount({ name, email, password, role }: IUserData): Promise<void> {
    if (await this.findOneByEmail(email)) {
      throw new BadRequest('User with provided email already exists');
    }
    console.log(role)
    const user = User.create({ name, email, password, role });
    await user.save();
  }

  public async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await User.findOne({
      where: { email },
    });

    return user;
  }
}

export const usersService = new UsersService();
