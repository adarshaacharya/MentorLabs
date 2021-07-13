import { CoreEntity } from 'common/entities/core.entity';
import { Status } from 'common/enums/status.enum';
import { Column, Entity } from 'typeorm';

/**
 * mentorship application
 */
@Entity()
export class Mentorship extends CoreEntity {
  @Column()
  background: string;

  @Column()
  expectation: string;

  @Column()
  message: string;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: Status;
}
