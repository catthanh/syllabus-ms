import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateProgramRequestDto } from '../programs/dto/request/create-program.request.dto';
import { UpdateProgramBody } from '../programs/dto/request/update-program.request.dto';
import { ProgramResponseDto } from '../programs/dto/response/program.response.dto';
import { ProgramEntity } from '../programs/program.entity';
import { CreateSyllabusRequestDto } from '../syllabuses/dto/request/create-syllabus.request.dto';
import { UpdateSyllabusDto } from '../syllabuses/dto/request/update-syllabus.request.dto';
import { SyllabusResponseDto } from '../syllabuses/dto/response/syllabus.response.dto';
import { SyllabusEntity } from '../syllabuses/entities/syllabus.entity';
import { UserEntity } from '../users/entities/user.entity';
import {
  ApprovalRequestStatusEnum,
  EntityTypeEnum,
  RequestTypeEnum,
} from './approval-request.enum';

@Entity('approval_requests')
export class ApprovalRequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RequestTypeEnum,
  })
  requestType: RequestTypeEnum;

  @Column({
    type: 'enum',
    enum: EntityTypeEnum,
  })
  entityType: EntityTypeEnum;

  @Column({
    type: 'int',
  })
  entityId: number;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  draftEntity: SyllabusResponseDto | ProgramResponseDto;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  request:
    | CreateSyllabusRequestDto
    | UpdateSyllabusDto
    | CreateProgramRequestDto
    | UpdateProgramBody;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  currentEntity: SyllabusResponseDto | ProgramResponseDto;

  @ManyToOne(() => UserEntity)
  requester: UserEntity;

  @ManyToOne(() => UserEntity)
  reviewer: UserEntity;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  comment: string;

  @Column({
    enum: ApprovalRequestStatusEnum,
  })
  status: ApprovalRequestStatusEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
