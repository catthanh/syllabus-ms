import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  MaterialLanguageEnum,
  MaterialTypeEnum,
} from './reference-materials.constants';

@Entity('reference_materials')
export class ReferenceMaterialsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
    enum: MaterialLanguageEnum,
  })
  language: MaterialLanguageEnum;

  @Column({
    type: 'int',
  })
  releaseYear: number;

  @Column({
    type: 'varchar',
    enum: MaterialTypeEnum,
  })
  materialType: MaterialTypeEnum;
}
