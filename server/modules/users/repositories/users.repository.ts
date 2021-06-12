import { EntityRepository, Repository } from 'typeorm';
import { User } from '../user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { email },
    });
    return user;
  }
}
