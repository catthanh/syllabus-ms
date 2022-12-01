import { IEntity } from '@common/interface/base.entity.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleDepartmentUser } from './role-department-user.entity';

@Entity('users')
export class UserEntity implements IEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  name: string;

  @OneToMany(
    () => RoleDepartmentUser,
    (roleDepartmentUser) => roleDepartmentUser.user,
    {
      cascade: true,
    },
  )
  userToDepartments: RoleDepartmentUser[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
