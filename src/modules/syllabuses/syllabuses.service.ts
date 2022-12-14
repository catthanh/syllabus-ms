import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Brackets } from 'typeorm';
import { ResponseDto } from '../common/dto/response/base.response.dto';
import {
  PaginationResponseBuilder,
  ResponseBuilder,
} from '../common/util/helper.util';
import { ReferenceMaterialsEntity } from '../reference-materials/reference-materials.entity';
import { UserEntity } from '../users/entities/user.entity';
import { CreateSyllabusRequestDto } from './dto/request/create-syllabus.request.dto';
import { SyllabusEntity } from './entities/syllabus.entity';
import 'lodash';
import { SyllabusResponseDto } from './dto/response/syllabus.response.dto';
import { UpdateSyllabusDto } from './dto/request/update-syllabus.request.dto';
import { PaginationResponseDto } from '../common/dto/response/pagination.response.dto';
import { PaginationQueryDto } from '../common/dto/request/pagination-query.request.dto';
import * as _ from 'lodash';
import { SyllabusStatusEnum } from './syllabuses.constants';
import { RoleEnum } from '../users/role.enum';
import { ApprovalRequestEntity } from '../approval-request/approval-request.entity';
import { UserResponseDto } from '../users/dto/response/user.response.dto';
import {
  ApprovalRequestStatusEnum,
  EntityTypeEnum,
  RequestTypeEnum,
} from '../approval-request/approval-request.enum';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SyllabusesService {
  constructor(
    @InjectRepository(SyllabusEntity)
    private readonly syllabusRepository: Repository<SyllabusEntity>,
    @InjectRepository(ReferenceMaterialsEntity)
    private readonly referenceMaterialRepository: Repository<ReferenceMaterialsEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(ApprovalRequestEntity)
    private readonly approvalRequestRepository: Repository<ApprovalRequestEntity>,
  ) {}

  async create(
    request: CreateSyllabusRequestDto,
    approve = false,
  ): Promise<SyllabusEntity> {
    const existCode = await this.syllabusRepository.findOne({
      where: {
        courseCode: request.courseCode,
      },
    });
    if (existCode) {
      throw new HttpException('M?? m??n h???c ???? t???n t???i', HttpStatus.BAD_REQUEST);
    }
    let prerequisiteCourses = null;
    if (!_.isEmpty(request.prerequisiteIds)) {
      prerequisiteCourses = await this.syllabusRepository.findBy({
        id: In(request.prerequisiteIds),
      });
      if (prerequisiteCourses.length !== request.prerequisiteIds.length) {
        throw new HttpException(
          'M??n ti??n quy???t kh??ng t???n t???i',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    const referenceMaterials = request.referenceMaterials.map(
      (referenceMaterial) => {
        const newReferenceMaterial =
          this.referenceMaterialRepository.create(referenceMaterial);
        return newReferenceMaterial;
      },
    );

    const primaryLecturer = await this.usersRepository.findOneBy({
      id: request.primaryLecturerId,
      userToDepartments: {
        role: RoleEnum.LECTURER,
      },
    });
    if (!primaryLecturer) {
      throw new HttpException(
        'Gi???ng vi??n ch??nh kh??ng t???n t???i',
        HttpStatus.NOT_FOUND,
      );
    }
    const otherLecturers = await this.usersRepository.findBy({
      id: In(request.otherLecturerIds),
      userToDepartments: {
        role: RoleEnum.LECTURER,
      },
    });
    if (otherLecturers.length !== request.otherLecturerIds.length) {
      throw new HttpException(
        'Gi???ng vi??n ph??? kh??ng t???n t???i',
        HttpStatus.NOT_FOUND,
      );
    }
    const queryRunner =
      this.syllabusRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const syllabus = this.syllabusRepository.create(request);
      syllabus.primaryLecturer = primaryLecturer;
      syllabus.otherLecturers = otherLecturers;
      syllabus.prerequisiteCourses = prerequisiteCourses;
      syllabus.status = SyllabusStatusEnum.DRAFT;
      syllabus.isHidden = false;
      const savedReferenceMaterials = await queryRunner.manager.save(
        referenceMaterials,
      );
      syllabus.referenceMaterials = savedReferenceMaterials;
      const result = await queryRunner.manager.save(syllabus);
      if (approve) await queryRunner.commitTransaction();
      // @TODO create approval request
      else {
        const approvalRequest = new ApprovalRequestEntity();
        approvalRequest.entityId = result.id;
        approvalRequest.entityType = EntityTypeEnum.SYLLABUS;
        approvalRequest.requestType = RequestTypeEnum.CREATE;
        approvalRequest.status = ApprovalRequestStatusEnum.PENDING;
        approvalRequest.draftEntity = plainToInstance(
          SyllabusResponseDto,
          result,
        );
        approvalRequest.request = request;
        await queryRunner.rollbackTransaction();
        await queryRunner.manager.save(approvalRequest);
      }
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'Something went wrong while creating syllabus',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async get(id: number): Promise<ResponseDto<SyllabusResponseDto>> {
    const syllabus = await this.syllabusRepository.findOne({
      where: { id },
      relations: [
        'primaryLecturer',
        'otherLecturers',
        'prerequisiteCourses',
        'referenceMaterials',
      ],
    });
    console.log(syllabus);
    if (!syllabus) {
      throw new HttpException('Kh??ng t???n t???i', HttpStatus.NOT_FOUND);
    }
    return new ResponseBuilder<SyllabusResponseDto>()
      .withCode(HttpStatus.OK)
      .withMessage('Th??nh c??ng')
      .withData(syllabus, SyllabusResponseDto)
      .build();
  }

  async update(
    id: number,
    request: UpdateSyllabusDto,
    approve = false,
  ): Promise<ResponseDto<SyllabusResponseDto>> {
    const syllabus = await this.syllabusRepository.findOne({
      where: { id },
      relations: [
        'primaryLecturer',
        'otherLecturers',
        'prerequisiteCourses',
        'referenceMaterials',
      ],
    });
    if (!syllabus) {
      throw new HttpException('Kh??ng t???n t???i', HttpStatus.NOT_FOUND);
    }
    if (syllabus.status !== SyllabusStatusEnum.DRAFT) {
      throw new HttpException(
        'Ch??? c?? th??? s???a b???n nh??p',
        HttpStatus.BAD_REQUEST,
      );
    }
    const oldReferenceMaterials = syllabus.referenceMaterials;
    const referenceMaterials = request.referenceMaterials.map(
      (referenceMaterial) => {
        const newReferenceMaterial =
          this.referenceMaterialRepository.create(referenceMaterial);
        return newReferenceMaterial;
      },
    );

    const primaryLecturer = await this.usersRepository.findOneBy({
      id: request.primaryLecturerId,
    });
    if (!primaryLecturer) {
      throw new HttpException(
        'Gi???ng vi??n ch??nh kh??ng t???n t???i',
        HttpStatus.NOT_FOUND,
      );
    }
    const otherLecturers = await this.usersRepository.findBy({
      id: In(request.otherLecturerIds),
    });
    if (otherLecturers.length !== request.otherLecturerIds.length) {
      throw new HttpException(
        'Gi???ng vi??n ph??? kh??ng t???n t???i',
        HttpStatus.NOT_FOUND,
      );
    }

    let prerequisiteCourses = null;
    if (!_.isEmpty(request.prerequisiteIds)) {
      prerequisiteCourses = await this.syllabusRepository.findBy({
        id: In(request.prerequisiteIds),
      });
      if (prerequisiteCourses.length !== request.prerequisiteIds.length) {
        throw new HttpException(
          'M??n ti??n quy???t kh??ng t???n t???i',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    const queryRunner =
      this.syllabusRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newSyllabus = this.syllabusRepository.create(request);
      newSyllabus.id = id;
      newSyllabus.primaryLecturer = primaryLecturer;
      newSyllabus.otherLecturers = otherLecturers;
      newSyllabus.prerequisiteCourses = prerequisiteCourses;
      await queryRunner.manager.remove(oldReferenceMaterials);
      const savedReferenceMaterials = await queryRunner.manager.save(
        referenceMaterials,
      );
      syllabus.referenceMaterials = savedReferenceMaterials;
      const result = await queryRunner.manager.save(newSyllabus);
      if (approve) await queryRunner.commitTransaction();
      else {
        const approvalRequest = new ApprovalRequestEntity();
        approvalRequest.entityId = result.id;
        approvalRequest.requestType = RequestTypeEnum.UPDATE;
        approvalRequest.entityType = EntityTypeEnum.SYLLABUS;
        approvalRequest.status = ApprovalRequestStatusEnum.PENDING;
        approvalRequest.draftEntity = plainToInstance(
          SyllabusResponseDto,
          result,
        );
        approvalRequest.request = request;
        await queryRunner.rollbackTransaction();
        await queryRunner.manager.save(approvalRequest);
      }
      return new ResponseBuilder<SyllabusResponseDto>()
        .withCode(HttpStatus.OK)
        .withMessage('C???p nh???t th??nh c??ng')
        .withData(result, SyllabusResponseDto)
        .build();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'L???i c???p nh???t ????? c????ng',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async delete(id: number): Promise<ResponseDto<SyllabusResponseDto>> {
    const syllabus = await this.syllabusRepository.findOne({
      where: { id },
      relations: [
        'primaryLecturer',
        'otherLecturers',
        'prerequisiteCourses',
        'referenceMaterials',
      ],
    });
    if (!syllabus) {
      throw new HttpException('Kh??ng t???n t???i', HttpStatus.NOT_FOUND);
    }
    const queryRunner =
      this.syllabusRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.remove(syllabus);
      await queryRunner.commitTransaction();
      return new ResponseBuilder<SyllabusResponseDto>()
        .withCode(HttpStatus.OK)
        .withMessage('X??a th??nh c??ng')
        .withData(syllabus, SyllabusResponseDto)
        .build();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'Something went wrong while deleting syllabus',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async getList(
    request: PaginationQueryDto,
  ): Promise<PaginationResponseDto<SyllabusResponseDto>> {
    const { page, limit, search, sort, filter } = request;
    const queryBuilder = this.syllabusRepository.createQueryBuilder('syllabus');
    queryBuilder.leftJoinAndSelect(
      'syllabus.primaryLecturer',
      'primaryLecturer',
    );
    queryBuilder.leftJoinAndSelect('syllabus.otherLecturers', 'otherLecturers');
    queryBuilder.leftJoinAndSelect(
      'syllabus.prerequisiteCourses',
      'prerequisiteCourses',
    );
    queryBuilder.leftJoinAndSelect(
      'syllabus.referenceMaterials',
      'referenceMaterials',
    );
    if (request.search) {
      queryBuilder.where(
        new Brackets((qb) => {
          qb.where('syllabus.course_name ILIKE :search', {
            search: `%${search}%`,
          }).orWhere('syllabus.course_code ILIKE :search', {
            search: `%${search}%`,
          });
        }),
      );
    }
    if (filter) {
      switch (filter.filterBy) {
        case 'courseCode':
          queryBuilder.where('syllabus.course_code ILIKE :search', {
            search: `%${filter.filterValue}%`,
          });
          break;
        case 'courseName':
          queryBuilder.where('syllabus.course_name ILIKE :search', {
            search: `%${filter.filterValue}%`,
          });
          break;
        default:
          break;
      }
    }
    if (sort) {
      for (const { sortBy, sortDirection } of sort) {
        switch (sortBy) {
          case 'courseCode':
            queryBuilder.addOrderBy('syllabus.course_code', sortDirection);
            break;
          case 'courseName':
            queryBuilder.addOrderBy('syllabus.course_name', sortDirection);
            break;
          default:
            break;
        }
      }
    }
    if (limit) {
      queryBuilder.take(limit);
    }
    if (page) {
      queryBuilder.skip((page - 1) * limit);
    }
    const [data, total] = await queryBuilder.getManyAndCount();
    return new PaginationResponseBuilder<SyllabusResponseDto>()
      .withCode(HttpStatus.OK)
      .withMessage('L???y danh s??ch th??nh c??ng')
      .withData(data, SyllabusResponseDto)
      .withPage(page)
      .withLimit(limit)
      .withTotal(total)
      .build();
  }

  async approve(id: number): Promise<ResponseDto<SyllabusResponseDto>> {
    const syllabus = await this.syllabusRepository.findOne({
      where: { id, status: SyllabusStatusEnum.DRAFT },
      relations: [
        'primaryLecturer',
        'otherLecturers',
        'prerequisiteCourses',
        'referenceMaterials',
      ],
    });
    if (!syllabus) {
      throw new HttpException('Kh??ng t???n t???i b???n nh??p', HttpStatus.NOT_FOUND);
    }
    syllabus.status = SyllabusStatusEnum.APPROVED;
    const currentSyllabus = await this.syllabusRepository.findOne({
      where: {
        courseCode: syllabus.courseCode,
        status: SyllabusStatusEnum.APPROVED,
      },
    });
    if (currentSyllabus) {
      syllabus.id = currentSyllabus.id;
    } else delete syllabus.id;
    const result = await this.syllabusRepository.save(syllabus);
    return new ResponseBuilder<SyllabusResponseDto>()
      .withCode(HttpStatus.OK)
      .withMessage('Duy???t th??nh c??ng')
      .withData(result, SyllabusResponseDto)
      .build();
  }

  async hide(id: number) {
    const syllabus = await this.syllabusRepository.findOne({
      where: { id, status: SyllabusStatusEnum.APPROVED },
      relations: [
        'primaryLecturer',
        'otherLecturers',
        'prerequisiteCourses',
        'referenceMaterials',
      ],
    });
    if (!syllabus) {
      throw new HttpException('Kh??ng t???n t???i', HttpStatus.NOT_FOUND);
    }
    syllabus.isHidden = true;
    const result = await this.syllabusRepository.save(syllabus);
    return new ResponseBuilder<SyllabusResponseDto>()
      .withCode(HttpStatus.OK)
      .withMessage('???n th??nh c??ng')
      .withData(result, SyllabusResponseDto)
      .build();
  }

  async show(id: number) {
    const syllabus = await this.syllabusRepository.findOne({
      where: { id, status: SyllabusStatusEnum.APPROVED },
      relations: [
        'primaryLecturer',
        'otherLecturers',
        'prerequisiteCourses',
        'referenceMaterials',
      ],
    });
    if (!syllabus) {
      throw new HttpException('Kh??ng t???n t???i', HttpStatus.NOT_FOUND);
    }
    syllabus.isHidden = false;
    const result = await this.syllabusRepository.save(syllabus);
    return new ResponseBuilder<SyllabusResponseDto>()
      .withCode(HttpStatus.OK)
      .withMessage('Hi???n th??nh c??ng')
      .withData(result, SyllabusResponseDto)
      .build();
  }

  async createApprovalRequest(id: number, user: UserResponseDto) {
    if (user.userToDepartments.every((x) => x.role !== RoleEnum.SPECIALIST)) {
      throw new HttpException('Kh??ng c?? quy???n', HttpStatus.FORBIDDEN);
    }
    const requester = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: ['userToDepartments'],
    });
    const syllabus = await this.syllabusRepository.findOne({
      where: { id },
      relations: [
        'primaryLecturer',
        'otherLecturers',
        'prerequisiteCourses',
        'referenceMaterials',
      ],
    });
    if (!syllabus) {
      throw new HttpException('Kh??ng t???n t???i', HttpStatus.NOT_FOUND);
    }
    if (syllabus.status !== SyllabusStatusEnum.DRAFT)
      throw new HttpException('Kh??ng th??? t???o y??u c???u', HttpStatus.BAD_REQUEST);
    const approvalRequest = new ApprovalRequestEntity();
    approvalRequest.draftEntity = plainToInstance(
      SyllabusResponseDto,
      syllabus,
    );
    const currentSyllabus = await this.syllabusRepository.findOne({
      where: {
        courseCode: syllabus.courseCode,
        status: SyllabusStatusEnum.APPROVED,
      },
      relations: [
        'primaryLecturer',
        'otherLecturers',
        'prerequisiteCourses',
        'referenceMaterials',
      ],
    });
    approvalRequest.currentEntity = plainToInstance(
      SyllabusResponseDto,
      currentSyllabus,
    );
    approvalRequest.entityId = syllabus.id;
    approvalRequest.entityType = EntityTypeEnum.SYLLABUS;
    approvalRequest.requester = requester;
    approvalRequest.status = ApprovalRequestStatusEnum.PENDING;
    const req = await this.approvalRequestRepository.save(approvalRequest);
    const result = await this.syllabusRepository.save(syllabus);
    return new ResponseBuilder<SyllabusResponseDto>()
      .withCode(HttpStatus.OK)
      .withMessage('T???o y??u c???u th??nh c??ng')
      .withData(result, SyllabusResponseDto)
      .build();
  }
}
