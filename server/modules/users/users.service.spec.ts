import { Repository } from 'typeorm';
import { Role } from '../../common/enums';
import { Profile } from './entities/profile.entity';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/users.repository';
import { UsersService } from './users.service';

// type MockRepository<T = any> = Partial<Record<keyof Repository<User>, jest.Mock>>;

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
    const repository = new UserRepository();

    it('should add user to the database', async () => {
      const spy = jest.spyOn(service, 'createAccount').mockResolvedValueOnce(userData);

      const user = await service.createAccount(payload);

      expect(user).toMatchObject(userData);
      expect(user).toEqual(userData);
      expect(spy).toHaveBeenCalledWith(payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should fail if user exists', async () => {
      const user = new User();
      const spy = jest.spyOn(service, 'createAccount').mockResolvedValueOnce(userData);
      jest.spyOn(repository, 'findOneByEmail').mockResolvedValue(user);

      await service.createAccount(payload);

      const result = await service.createAccount(payload);

      expect(result).toMatchObject({
        ok: false,
        statusCode: 400,
        message: 'User with provided email already exists',
      });
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
