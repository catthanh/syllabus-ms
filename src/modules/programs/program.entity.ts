import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { CourseEntity } from '../courses/course.entity';
import { MajorEntity } from '../majors/major.entity';

@Entity('programs')
export class ProgramEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  description: string;

  @ManyToOne(() => MajorEntity)
  major: MajorEntity;

  @ManyToMany(() => CourseEntity, (course) => course.programs)
  courses: CourseEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
