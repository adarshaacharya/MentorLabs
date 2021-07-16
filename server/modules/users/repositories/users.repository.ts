import { Role } from '../../../common/enums';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { email },
    });
    return user;
  }

  public async isMentor(id: number): Promise<boolean> {
    const user = await this.findOne(id);

    return user?.role === Role.TEACHER;
  }
}
