import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CoreEntity } from '../../../common/entities';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Room extends CoreEntity {
  @Column({ nullable: true })
  title: string;

  @ManyToOne(() => User)
  @JoinColumn()
  creator: User;

  // explicit mention
  @Column()
  creatorId: string;

  // since particpant is
  @ManyToOne(() => User)
  @JoinColumn()
  participant: User;

  // explicit mention
  @Column({ nullable: true })
  participantId: string;
}
