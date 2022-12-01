import { GroupEntity } from './groups.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SyllabusEntity } from '../../syllabuses/entities/syllabus.entity';

@Entity('group_courses')
export class GroupCoursesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SyllabusEntity, (syllabus) => syllabus.groupCourses)
  syllabus: SyllabusEntity;

  @ManyToOne(() => GroupEntity, (group) => group.groupCourses)
  group: GroupEntity;
}
