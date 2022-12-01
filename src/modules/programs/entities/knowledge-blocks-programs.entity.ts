import { KnowledgeBlockEntity } from './knowledge-blocks.entity';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProgramEntity } from './programs.entity';
import { GroupEntity } from './groups.entity';

@Entity('knowledge_blocks_programs')
export class KnowledgeBlockProgramEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => GroupEntity, (group) => group.knowledgeBlockProgram)
  groups: GroupEntity[];

  @ManyToOne(
    () => KnowledgeBlockEntity,
    (knowledgeBlock) => knowledgeBlock.knowledgeBlocksProgram,
  )
  knowledgeBlock: KnowledgeBlockEntity;

  @ManyToOne(() => ProgramEntity, (program) => program.knowledgeBlocksProgram)
  program: ProgramEntity;
}
