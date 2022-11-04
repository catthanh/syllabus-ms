import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleDepartmentUser } from './role-department-user.entity';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(
    () => RoleDepartmentUser,
    (roleDepartmentUser) => roleDepartmentUser.role,
  )
  roleDepartmentUser: RoleDepartmentUser[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
