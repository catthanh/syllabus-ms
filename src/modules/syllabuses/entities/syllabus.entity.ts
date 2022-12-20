import { ReferenceMaterialsEntity } from '../../reference-materials/reference-materials.entity';
import { UserEntity } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AssessmentForm } from '../interface/assessment-form.interface';
import { CourseOutcomeStandard } from '../interface/course-outcome-standard.interface';
import { CourseSchedule } from '../interface/course-schedule.interface';
import { CourseTestSchedule } from '../interface/course-test.interface';
import { TeachingSchedule } from '../interface/teaching-schedule.interface';
import { CourseType, SyllabusStatusEnum } from '../syllabuses.constants';
import { CourseTimeDistribution } from '../interface/course-time-distribution.interface';
import { DepartmentEntity } from '../../departments/department.entity';

@Entity('syllabuses')
export class SyllabusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  primaryLecturer: UserEntity;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  otherLecturers: UserEntity[];

  @Column()
  courseCode: string;

  @Column()
  courseName: string;

  @Column({
    type: 'enum',
    enum: SyllabusStatusEnum,
  })
  status: SyllabusStatusEnum;

  @Column({
    type: 'boolean',
  })
  isHidden: boolean;

  @Column({
    type: 'int',
  })
  courseCredit: number;

  @Column({
    type: 'jsonb',
  })
  courseTimeDistribution: CourseTimeDistribution;

  @ManyToMany(() => SyllabusEntity, {
    cascade: true,
  })
  @JoinTable()
  prerequisiteCourses: SyllabusEntity[];

  @Column({
    type: 'enum',
    enum: CourseType,
  })
  courseType: CourseType;

  @ManyToOne(() => DepartmentEntity)
  @JoinColumn()
  department: DepartmentEntity;

  @Column({
    type: 'varchar',
  })
  courseTarget: string;

  @Column({
    type: 'jsonb',
  })
  outcomeStandard: CourseOutcomeStandard[];

  @Column({
    type: 'varchar',
  })
  courseSummary: string;

  @Column({
    type: 'varchar',
  })
  courseContent: string;

  @ManyToMany(() => ReferenceMaterialsEntity, {
    cascade: true,
  })
  @JoinTable()
  referenceMaterials: ReferenceMaterialsEntity[];

  @Column({
    type: 'jsonb',
  })
  teachingSchedule: TeachingSchedule[];

  @Column({
    type: 'jsonb',
  })
  detailedTeachingSchedule: CourseSchedule[];

  @Column({
    type: 'varchar',
  })
  coursePolicy: string;

  @Column({
    type: 'jsonb',
  })
  midtermAssessment: AssessmentForm[];

  @Column({
    type: 'jsonb',
  })
  finalAssessment: AssessmentForm;

  @Column({
    type: 'varchar',
  })
  assessmentCriteria: string;

  @Column({
    type: 'jsonb',
  })
  midtermAssessmentSchedule: CourseTestSchedule[];

  @Column({
    type: 'jsonb',
  })
  finalAssessmentSchedule: CourseTestSchedule;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
