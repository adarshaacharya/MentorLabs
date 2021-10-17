import normalizeUrl from 'normalize-url';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Role } from '../../common/enums';
import { BadRequest, NotFound, Unauthorized } from '../../common/exceptions';
import { generateJwtToken } from '../../common/utils/generate-jwt';
import { Gravatar } from '../../services/Gravatar';
import { getRecommendation } from './algorithm';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';
import { CreateProfileInput, CreateProfileOutput } from './dtos/create-profile.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { Profile } from './entities/profile.entity';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/users.repository';

@Service()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository, // instead of model we pass the custom repository

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  public async me(id: string | undefined) {
    const user = await this.userRepository.findOne({
      select: ['id', 'name', 'email', 'role', 'avatar'],
      where: { id },
    });

    return user;
  }

  public async createAccount({ name, email, password, role }: CreateAccountInput): Promise<CreateAccountOutput> {
    const userExists = await this.userRepository.findOneByEmail(email);
    if (userExists) {
      throw new BadRequest('User with provided email already exists');
    }

    const avatar = Gravatar.generateUrl(email);
    const user = await this.userRepository.save(this.userRepository.create({ name, email, password, role, avatar }));

    const token = generateJwtToken({ id: user.id, role: user.role });

    return { token, id: user.id, name, email, avatar, role };
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

    const { id, name, avatar, role } = user;
    return { token, id, name, email, avatar, role };
  }

  public async creatProfile(userId: string, createProfileInput: CreateProfileInput): Promise<CreateProfileOutput> {
    const channels = [...createProfileInput.channels];

    // normalizing channels url
    channels.forEach((channel) => {
      for (const [_, val] of Object.entries(channel)) {
        if (val && val.length > 0) {
          channel.link = normalizeUrl(val, { forceHttps: true });
        }
      }
    });

    const profile = await this.profileRepository.save(
      this.profileRepository.create({ userId, ...createProfileInput, channels }),
    );

    return {
      title: profile.title,
      tags: profile.tags,
      country: profile.country,
      languages: profile.languages,
      description: profile.description,
      channels: profile.channels,
      userId,
    };
  }

  public async findOneById(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
      select: ['id', 'name', 'email', 'role', 'avatar', 'profile'],
    });

    if (!user) {
      throw new NotFound("User with given id doesn't exists");
    }
    return user;
  }

  public async getTeachers() {
    const teachers = await this.userRepository.find({
      where: { role: Role.TEACHER },
      relations: ['profile'],
      select: ['id', 'name', 'email', 'role', 'avatar', 'profile'],
    });

    const teachersWithProfile = teachers.filter((teacher) => teacher.profile !== null);
    return teachersWithProfile;
  }

  public async getStudents() {
    const students = await this.userRepository.find({
      where: { role: Role.STUDENT },
      relations: ['profile'],
      select: ['id', 'name', 'email', 'role', 'avatar', 'profile'],
    });

    return students;
  }

  public async getTeachersRecommendations(id: string) {
    const me = await this.me(id);
    const mentors = await this.getTeachers();
    const teachers = me && getRecommendation(me, mentors);
    return teachers;
  }
}
