import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GroupEntity } from './groups.entity';
import { KnowledgeBlockProgramEntity } from './knowledge-blocks-programs.entity';

@Entity('knowledge_blocks')
export class KnowledgeBlockEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  knowledgeBlockName: string;

  @OneToMany(
    () => KnowledgeBlockProgramEntity,
    (knowledgeBlockProgram) => knowledgeBlockProgram.knowledgeBlock,
  )
  knowledgeBlocksProgram: KnowledgeBlockProgramEntity[];
}
