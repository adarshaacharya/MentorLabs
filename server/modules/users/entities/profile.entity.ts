import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CoreEntity } from '../../../common/entities';
import { Channel } from '../../../common/interfaces';
import { User } from './user.entity';

@Entity()
export class Profile extends CoreEntity {
  @Column()
  title: string; // user profession

  @Column()
  description: string;

  @Column('text', { array: true })
  tags: string[];

  @Column()
  country: string;

  @Column('text', { array: true })
  languages: string[];

  @Column({ type: 'json' })
  channels: Channel[];

  // this automatically forms column named userId on profile, plus make it bidirectional
  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' }) // if user gets deletd delete its record in profile too..
  @JoinColumn() // create userId on profile table
  user: User;

  // created already but implicity defined so that we can pass userid from jwt
  @Column()
  userId: string;
}
