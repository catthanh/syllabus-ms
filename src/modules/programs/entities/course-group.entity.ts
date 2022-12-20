import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { SyllabusEntity } from '../../syllabuses/entities/syllabus.entity';
import { ProgramEntity } from '../program.entity';

@Entity('course_group')
@Tree('closure-table')
export class CourseGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => ProgramEntity, (program) => program.groups, {
    nullable: true,
  })
  program: ProgramEntity;

  @TreeChildren()
  children: CourseGroupEntity[];

  @TreeParent()
  parent: CourseGroupEntity;

  @ManyToMany(() => SyllabusEntity, {
    cascade: true,
  })
  @JoinTable()
  courses: SyllabusEntity[];
}
