import { Repository } from 'typeorm';
import { Role } from '../../common/enums';
import { Profile } from './entities/profile.entity';
import { UserRepository } from './repositories/users.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersRepository: UserRepository;
  let profileRepository: Repository<Profile>;

  const payload = {
    name: 'bs',
    email: 'bs@mail.com',
    password: 'bs',
    role: Role.STUDENT,
  };

  const userData = {
    token: 'randomtoken',
    id: '1',
    name: 'bs',
    email: 'bs@mail.com',
    avatar: 'http://',
    role: Role.STUDENT,
  };

  describe('createAccount', () => {
    const service = new UsersService(usersRepository, profileRepository);

    it('should add user to the database', async () => {
      const spy = jest.spyOn(service, 'createAccount').mockResolvedValueOnce(userData);

      const user = await service.createAccount(payload);

      expect(user).toMatchObject(userData);
      expect(user).toEqual(userData);
      expect(spy).toHaveBeenCalledWith(payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
