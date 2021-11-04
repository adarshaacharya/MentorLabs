import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { CoreEntity } from '../../../common/entities/core.entity';
import { Status } from '../../../common/enums/status.enum';
import { User } from '../../users/entities/user.entity';
import { Response } from './response.entity';

/**
 * mentorship application
 */
@Entity({ name: 'mentorship' })
export class Mentorship extends CoreEntity {
  @Column()
  title: string;

  @Column()
  background: string;

  @Column()
  expectation: string;

  @Column()
  message: string;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: Status;

  // each mentorship is owned by only one mentor
  @ManyToOne(() => User, (user) => user.books, {
    onDelete: 'SET NULL', // if user is deleted
    nullable: true,
  })
  mentee: User;

  //explicit mention
  @Column()
  menteeId: string;

  // many mentorship have one mentor
  @ManyToOne(() => User, (user) => user.mentors, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  mentor: User;

  //explicit mention
  @Column()
  mentorId: string;

  // each mentorship has one response
  @OneToOne(() => Response, (response) => response.mentorship)
  response: Response;
}
