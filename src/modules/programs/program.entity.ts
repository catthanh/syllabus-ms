import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CourseGroupEntity } from './entities/course-group.entity';
import { ProgramStatusEnum } from './programs.constant';

@Entity('programs')
export class ProgramEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vietnameseProgramName: string;

  @Column()
  englishProgramName: string;

  @Column()
  degree: string;

  @Column()
  yearOf: number;

  @Column()
  englishDegreeName: string;

  @Column()
  vietnameseDegreeName: string;

  @Column()
  standardOutput: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column()
  programCode: string;

  @OneToMany(() => CourseGroupEntity, (courseGroup) => courseGroup.parent, {
    cascade: true,
  })
  groups: CourseGroupEntity[];

  @Column({
    enum: ProgramStatusEnum,
    default: ProgramStatusEnum.DRAFT,
  })
  status: ProgramStatusEnum;

  @Column({
    default: false,
  })
  isHidden: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
