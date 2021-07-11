import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum ChannelName {
  EMAIL = 'email',
  SLACK = 'slack',
  LINKED = 'linkedin',
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
  GITHUB = 'github',
  WEBSITE = 'website',
}
@Entity({ name: 'teacher-profile' })
export class TeacherProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column('string', { array: true })
  tags: string[];

  @Column('string')
  country: string;

  @Column('string', { array: true })
  languages: string[];

  @Column('string')
  description: string;

  @Column({ type: 'enum', enum: ChannelName })
  role: ChannelName;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
