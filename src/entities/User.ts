import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100, unique: true })
  email!: string;

  @Column({ length: 100, nullable: true })
  firstName!: string;

  @Column({ length: 100, nullable: true })
  lastName!: string;

  @Column({ select: false })
  passwordHash!: string;
  
  @Column({ type: 'timestamp', nullable: true })
  lastLoginDate?: Date;
  
  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
