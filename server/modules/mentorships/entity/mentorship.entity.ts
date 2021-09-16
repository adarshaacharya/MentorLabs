import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreEntity } from '../../../common/entities/core.entity';
import { Status } from '../../../common/enums/status.enum';
import { User } from '../../../modules/users/entities/user.entity';

/**
 * mentorship application
 */
@Entity()
export class Mentorship extends CoreEntity {
  @Column()
  title: string;

  @Column()
  background: string;

  @Column()
  expectation: string;

  @Column()
  message: string;

  // each mentorship is owned by only one mentor
  @ManyToOne(() => User, (user) => user.books, {
    onDelete: 'SET NULL', // if user is deleted
    nullable: true,
  })
  mentee: User;

  //explicit mention
  @Column()
  menteeId: number;

  // many mentorship have one mentor
  @ManyToOne(() => User, (user) => user.mentors, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  mentor: User;

  //explicit mention
  @Column()
  mentorId: number;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: Status;
}
