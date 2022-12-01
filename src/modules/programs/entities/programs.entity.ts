import { DegreeEntity } from './degrees.entity';
import { GroupEntity } from './groups.entity';
import { KnowledgeBlockProgramEntity } from './knowledge-blocks-programs.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('programs')
export class ProgramEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  programCode: string;

  @Column({
    type: 'varchar',
  })
  vietnameseName: string;

  @Column({
    type: 'varchar',
  })
  englishName: string;

  @Column({
    type: 'varchar',
  })
  vietnameseDegreeName: string;

  @Column({
    type: 'varchar',
  })
  englishDegreeName: string;

  @ManyToOne(() => DegreeEntity, (degree) => degree.programs)
  degree: DegreeEntity;

  @Column({
    type: 'smallint',
  })
  year: number;

  @Column({
    type: 'boolean',
  })
  hidden: boolean;

  @Column({
    type: 'smallint',
  })
  version?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => KnowledgeBlockProgramEntity,
    (knowledgeBlockProgram) => knowledgeBlockProgram.program,
  )
  knowledgeBlocksProgram: KnowledgeBlockProgramEntity[];
}
