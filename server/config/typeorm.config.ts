import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Mentorship } from '../modules/mentorships/entities/mentorship.entity';
import { Response } from '../modules/mentorships/entities/response.entity';
import { Room } from '../modules/room/entities/room.entity';
import { Profile } from '../modules/users/entities/profile.entity';
import { User } from '../modules/users/entities/user.entity';

const DATABASE_TYPE = 'postgres';
export const ormconfig: ConnectionOptions = {
  name: 'default',
  type: DATABASE_TYPE,
  ...(process.env.DATABASE_URL
    ? { url: process.env.DATABASE_URL }
    : {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
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
