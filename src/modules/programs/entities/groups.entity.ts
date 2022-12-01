import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupCoursesEntity } from './program-courses.entity';
import { KnowledgeBlockProgramEntity } from './knowledge-blocks-programs.entity';

@Entity('groups')
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  groupName: string;

  @ManyToOne(() => KnowledgeBlockProgramEntity)
  knowledgeBlockProgram: KnowledgeBlockProgramEntity;

  @OneToMany(() => GroupCoursesEntity, (groupCourse) => groupCourse.group)
  groupCourses: GroupCoursesEntity[];
}
