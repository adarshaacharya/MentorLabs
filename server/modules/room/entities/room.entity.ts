import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CoreEntity } from '../../../common/entities';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Room extends CoreEntity {
  @Column({ nullable: true })
  title: string;

  @OneToOne(() => User)
  @JoinColumn()
  creator: User;

  @Column()
  creatorId: string;
}
