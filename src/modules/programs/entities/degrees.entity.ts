import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProgramEntity } from './programs.entity';

@Entity('degrees')
export class DegreeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  degreeName: string;

  @OneToMany(() => ProgramEntity, (program) => program.degree)
  programs: ProgramEntity[];
}
