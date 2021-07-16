import * as bcrypt from 'bcrypt';
import { Mentorship } from '../../../modules/mentorships/entity/mentorship.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { CoreEntity } from '../../../common/entities/core.entity';
import { Role } from '../../../common/enums/role.enum';

@Entity()
export class User extends CoreEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.STUDENT })
  role: Role;

  @Column({ nullable: false })
  avatar: string;

  @OneToMany(() => Mentorship, (mentorship) => mentorship.mentee)
  books: Mentorship[]; // user can books many mentorships

  @OneToMany(() => Mentorship, (mentorship) => mentorship.mentor)
  mentors: Mentorship[]; // mentor can mentors many mentorships

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async checkPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
