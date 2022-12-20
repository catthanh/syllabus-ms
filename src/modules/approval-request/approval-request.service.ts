import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/request/pagination-query.request.dto';
import { ProgramsService } from '../programs/programs.service';
import { SyllabusEntity } from '../syllabuses/entities/syllabus.entity';
import { SyllabusStatusEnum } from '../syllabuses/syllabuses.constants';
import { SyllabusesService } from '../syllabuses/syllabuses.service';
import { UserResponseDto } from '../users/dto/response/user.response.dto';
import { UsersService } from '../users/users.service';
import { ApprovalRequestEntity } from './approval-request.entity';
import {
  ApprovalRequestStatusEnum,
  EntityTypeEnum,
} from './approval-request.enum';

@Injectable()
export class ApprovalRequestService {
  constructor(
    @InjectRepository(ApprovalRequestEntity)
    private readonly approvalRequestRepository: Repository<ApprovalRequestEntity>,
    private readonly userService: UsersService,
    private readonly programService: ProgramsService,
    @InjectRepository(SyllabusEntity)
    private readonly syllabusRepository: Repository<SyllabusEntity>,
    private readonly syllabusService: SyllabusesService,
  ) {}

  async approve(id: number, user: UserResponseDto, comment: string) {
    const request = await this.approvalRequestRepository.findOne({
      where: { id },
    });
    if (!request) {
      throw new HttpException('Invalid approval request', 400);
    }
    const approver = await this.userService.getUserById(user.id);
    if (!approver) {
      throw new HttpException('Invalid approverId', 400);
    }

    if (request.status === ApprovalRequestStatusEnum.APPROVED) {
      throw new HttpException('Request already approved', 400);
    }
    request.reviewer = approver;
    request.comment = comment;
    request.status = ApprovalRequestStatusEnum.APPROVED;
    try {
      switch (request.entityType) {
        case EntityTypeEnum.SYLLABUS:
          this.syllabusService.approve(request.entityId);
        case EntityTypeEnum.PROGRAM:
        //this.programService.approve(request.entityId);
        default:
          break;
      }
    } catch (error) {
      throw new HttpException("Can't approve", 400);
    }

    return await this.approvalRequestRepository.save(request);
  }

  async reject(id: number, user: UserResponseDto, comment: string) {
    const request = await this.approvalRequestRepository.findOne({
      where: { id },
    });
    if (!request) {
      throw new HttpException('Invalid approval request', 400);
    }

    if (request.status === ApprovalRequestStatusEnum.REJECTED) {
      throw new HttpException('Request already rejected', 400);
    }
    if (request.status === ApprovalRequestStatusEnum.APPROVED) {
      throw new HttpException('Request already approved', 400);
    }
    const reviewer = await this.userService.getUserById(user.id);
    if (!reviewer) {
      throw new HttpException('Invalid approverId', 400);
    }
    request.reviewer = reviewer;
    request.comment = comment;
    request.status = ApprovalRequestStatusEnum.REJECTED;
    return await this.approvalRequestRepository.save(request);
  }

  async get(id: number) {
    const request = await this.approvalRequestRepository.findOne({
      where: { id },
    });
    if (!request) {
      throw new HttpException('Không tìm thấy yêu cầu', HttpStatus.NOT_FOUND);
    }
    switch (request.entityType) {
      case EntityTypeEnum.SYLLABUS:
      case EntityTypeEnum.PROGRAM:
        break;
      default:
        break;
    }
    return request;
  }

  async getList(
    query: PaginationQueryDto,
  ): Promise<[ApprovalRequestEntity[], number, number, number]> {
    const { page, limit } = query;
    const queryBuilder =
      this.approvalRequestRepository.createQueryBuilder('ar');

    if (limit) {
      queryBuilder.limit(limit);
    }
    if (page) {
      queryBuilder.offset((page - 1) * limit);
    }
    const [data, total] = await queryBuilder.getManyAndCount();
    return [data, page, limit, total];
  }
}
