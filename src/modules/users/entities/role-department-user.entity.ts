import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DepartmentEntity } from '../../departments/department.entity';
import { RoleEnum } from '../role.enum';
import { UserEntity } from './user.entity';

@Entity('roles_departments_users')
export class RoleDepartmentUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    enum: RoleEnum,
    default: RoleEnum.STUDENT,
  })
  role!: RoleEnum;

  @Column()
  userId!: number;

  @Column()
  departmentId!: number;

  @ManyToOne(() => UserEntity, (user) => user.userToDepartments)
  user!: UserEntity;

  @ManyToOne(
    () => DepartmentEntity,
    (department) => department.departmentToUsers,
  )
  department!: DepartmentEntity;
}
