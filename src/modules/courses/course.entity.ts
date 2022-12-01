import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProgramEntity } from '../programs/program.entity';
import { SyllabusEntity } from '../syllabuses/entities/syllabus.entity';

@Entity('courses')
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column({
    nullable: true,
  })
  description: string;

  @OneToMany(() => SyllabusEntity, (syllabus) => syllabus.course)
  syllabuses: SyllabusEntity[];

  @ManyToMany(() => ProgramEntity, (program) => program.courses)
  programs: ProgramEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
