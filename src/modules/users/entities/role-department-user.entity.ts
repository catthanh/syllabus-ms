import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DepartmentEntity } from '../../departments/department.entity';
import { RoleEntity } from './role.entity';
import { UserEntity } from './user.entity';

@Entity('roles_departments_users')
export class RoleDepartmentUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  roleId!: number;

  @Column()
  userId!: number;

  @Column()
  departmentId!: number;

  @ManyToOne(() => RoleEntity, (role) => role.roleDepartmentUser)
  role!: RoleDepartmentUser;

  @ManyToOne(() => UserEntity, (user) => user.roleDepartmentUser)
  user!: RoleDepartmentUser;

  @ManyToOne(
    () => DepartmentEntity,
    (department) => department.roleDepartmentUser,
  )
  department!: RoleDepartmentUser;
}
