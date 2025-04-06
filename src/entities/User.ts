import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Follower } from '../lib/types';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100, unique: true, nullable: false })
  email!: string;

  @Column({ length: 100, nullable: true })
  firstName!: string;

  @Column({ length: 100, nullable: true })
  lastName!: string;

  @Column({ length: 100 })
  username!: string;

  @Column()
  passwordHash!: string;

  @Column({ nullable: true })
  bio!: string;

  @Column({ nullable: true })
  picture!: string;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginDate?: Date;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @Column('jsonb', { default: [] })
  followers!: Follower[];

  @Column('jsonb', { default: [] })
  following!: Follower[];

  @UpdateDateColumn()
  updatedAt?: Date;
}
