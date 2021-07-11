import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Channel } from '.././../../common/interfaces/channel.interface';
import { User } from './user.entity';

@Entity({ name: 'teacher-profile' })
export class TeacherProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column('text', { array: true })
  tags: string[];

  @Column()
  country: string;

  @Column('text', { array: true })
  languages: string[];

  @Column()
  description: string;

  @Column({ type: 'json' })
  channels: Channel;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
