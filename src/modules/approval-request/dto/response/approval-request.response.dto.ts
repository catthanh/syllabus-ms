import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ProgramResponseDto } from '../../../programs/dto/response/program.response.dto';
import { SyllabusResponseDto } from '../../../syllabuses/dto/response/syllabus.response.dto';
import { UserResponseDto } from '../../../users/dto/response/user.response.dto';
import {
  ApprovalRequestStatusEnum,
  EntityTypeEnum,
  RequestTypeEnum,
} from '../../approval-request.enum';

export class ApprovalRequestResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  entityType: EntityTypeEnum;

  @ApiProperty()
  @Expose()
  requestType: RequestTypeEnum;

  @ApiProperty()
  @Expose()
  draftEntity: ProgramResponseDto | SyllabusResponseDto;

  @ApiProperty()
  @Expose()
  currentEntity: ProgramResponseDto | SyllabusResponseDto;

  @ApiProperty()
  @Expose()
  reviewer: UserResponseDto;

  @ApiProperty()
  @Expose()
  requester: UserResponseDto;

  @ApiProperty()
  @Expose()
  comment: string;

  @ApiProperty()
  @Expose()
  status: ApprovalRequestStatusEnum;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
