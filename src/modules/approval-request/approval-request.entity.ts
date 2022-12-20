import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProgramResponseDto } from '../programs/dto/response/program.response.dto';
import { SyllabusResponseDto } from '../syllabuses/dto/response/syllabus.response.dto';
import { UserEntity } from '../users/entities/user.entity';
import {
  ApprovalRequestStatusEnum,
  EntityTypeEnum,
} from './approval-request.enum';

@Entity('approval_requests')
export class ApprovalRequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
