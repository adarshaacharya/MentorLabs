import { Column, Entity, JoinColumn, OneToOne, RelationId } from 'typeorm';
import { CoreEntity } from '../../../common/entities';
import { Channel } from '../../../common/interfaces';
import { User } from './user.entity';

@Entity()
export class Profile extends CoreEntity {
  @Column({ nullable: true })
  title?: string;

  @Column()
  description: string;

  @Column('text', { array: true })
  tags: string[];

  @Column()
  country: string;

  @Column('text', { array: true })
  languages: string[];

  @Column({ type: 'json' })
  channels: Channel;

  // this automatically forms column named userId on profile
  @OneToOne(() => User, { onDelete: 'CASCADE' }) // if user gets deletd delete its record in profile too..
  @JoinColumn()
  user: User;

  // created already but implicity defined so that we can pass userid from jwt
  @RelationId((profile: Profile) => profile.user)
  userId: number;
}
