import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { getEnv } from '../common/utils';
import { Mentorship } from '../modules/mentorships/entities/mentorship.entity';
import { Response } from '../modules/mentorships/entities/response.entity';
import { Room } from '../modules/room/entities/room.entity';
import { Profile } from '../modules/users/entities/profile.entity';
import { User } from '../modules/users/entities/user.entity';

const DATABASE_TYPE = 'postgres';
export const ormconfig: ConnectionOptions = {
  name: 'default',
  type: DATABASE_TYPE,
  ...(getEnv('DATABASE_URL')
    ? { url: getEnv('DATABASE_URL') }
    : {
        host: getEnv('DB_HOST'),
        port: Number(getEnv('DB_PORT')),
        username: getEnv('DB_USER'),
        password: getEnv('DB_PASS'),
        database: getEnv('DB_NAME'),
      }),
  synchronize: true,
  logging: process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test',
  entities: [User, Profile, Mentorship, Response, Room],
  namingStrategy: new SnakeNamingStrategy(),
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
