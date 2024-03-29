import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CoreEntity } from '../../../common/entities';
import { Mentorship } from './mentorship.entity';

@Entity({ name: 'response' })
export class Response extends CoreEntity {
  @Column()
  date: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column()
  roomId: string;

  @Column()
  message: string;

  // each response has one mentorship
  @OneToOne(() => Mentorship, (mentorship) => mentorship.response)
  @JoinColumn()
  mentorship: Mentorship;

  // explicit
  @Column()
  mentorshipId: string;
}
