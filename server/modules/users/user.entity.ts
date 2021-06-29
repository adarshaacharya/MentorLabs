import * as bcrypt from 'bcrypt';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { ROLE } from '../../common/enums/role.enum';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsString()
  @Length(4, 20)
  name: string;

  @Column({ unique: true, nullable: false })
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  @IsString()
  @Length(4, 100)
  password: string;

  @Column({ type: 'enum', enum: ROLE, default: ROLE.Student })
  @IsEnum(ROLE)
  role: ROLE;

  @Column({ nullable: false })
  @IsString()
  avatar: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async checkPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
