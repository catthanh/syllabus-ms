import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DepartmentEntity } from '../departments/department.entity';
import { ProgramEntity } from '../programs/program.entity';

@Entity('majors')
export class MajorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  code: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  description: string;

  @ManyToOne(() => DepartmentEntity)
  department: DepartmentEntity;

  @OneToMany(() => ProgramEntity, (program) => program.major)
  programs: ProgramEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
