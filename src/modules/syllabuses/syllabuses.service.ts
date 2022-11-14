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
import { CourseEntity } from '../courses/course.entity';
import _ from 'lodash';

@Injectable()
export class SyllabusesService {
  constructor(
    @InjectRepository(SyllabusEntity)
    private readonly syllabusRepository: Repository<SyllabusEntity>,
    @InjectRepository(ReferenceMaterialsEntity)
    private readonly referenceMaterialRepository: Repository<ReferenceMaterialsEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {}

  async create(
    request: CreateSyllabusRequestDto,
  ): Promise<ResponseDto<SyllabusResponseDto>> {
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
        'Giảng viên chính không tồn tại',
        HttpStatus.NOT_FOUND,
      );
    }
    const otherLecturers = await this.usersRepository.findBy({
      id: In(request.otherLecturerIds),
    });
    if (otherLecturers.length !== request.otherLecturerIds.length) {
      throw new HttpException(
        'Giảng viên phụ không tồn tại',
        HttpStatus.NOT_FOUND,
      );
    }
    let prerequisiteCourses = null;
    if (!_.isEmpty(request.prerequisiteIds)) {
      prerequisiteCourses = await this.courseRepository.findBy({
        id: In(request.prerequisiteIds),
      });
      if (prerequisiteCourses.length !== request.prerequisiteIds.length) {
        throw new HttpException(
          'Môn tiên quyết không tồn tại',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    const course = await this.courseRepository.findOneBy({
      id: request.courseId,
    });

    if (!course) {
      throw new HttpException('Môn học không tồn tại', HttpStatus.NOT_FOUND);
    }

    // const courseCode = request.courseCode;
    // if (await this.syllabusRepository.findOneBy({ courseCode })) {
    //   throw new HttpException('Mã môn học đã tồn tại', HttpStatus.BAD_REQUEST);
    // }

    const queryRunner =
      this.syllabusRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const syllabus = this.syllabusRepository.create(request);
      syllabus.course = course;
      syllabus.primaryLecturer = primaryLecturer;
      syllabus.otherLecturers = otherLecturers;
      syllabus.prerequisiteCourses = prerequisiteCourses;
      const savedReferenceMaterials = await queryRunner.manager.save(
        referenceMaterials,
      );
      syllabus.referenceMaterials = savedReferenceMaterials;
      const result = await queryRunner.manager.save(syllabus);
      await queryRunner.commitTransaction();
      return new ResponseBuilder<SyllabusResponseDto>()
        .withCode(HttpStatus.CREATED)
        .withMessage('Tạo thành công')
        .withData(result, SyllabusResponseDto)
        .build();
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
    if (!syllabus) {
      throw new HttpException('Không tồn tại', HttpStatus.NOT_FOUND);
    }
    return new ResponseBuilder<SyllabusResponseDto>()
      .withCode(HttpStatus.OK)
      .withMessage('Thành công')
      .withData(syllabus, SyllabusResponseDto)
      .build();
  }

  async update(
    id: number,
    request: UpdateSyllabusDto,
  ): Promise<ResponseDto<SyllabusResponseDto>> {
    const syllabus = await this.syllabusRepository.findOne({
      where: { id },
      relations: [
        'primaryLecturer',
        'otherLecturers',
        'prerequisite',
        'referenceMaterials',
      ],
    });
    if (!syllabus) {
      throw new HttpException('Không tồn tại', HttpStatus.NOT_FOUND);
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
        'Giảng viên chính không tồn tại',
        HttpStatus.NOT_FOUND,
      );
    }
    const otherLecturers = await this.usersRepository.findBy({
      id: In(request.otherLecturerIds),
    });
    if (otherLecturers.length !== request.otherLecturerIds.length) {
      throw new HttpException(
        'Giảng viên phụ không tồn tại',
        HttpStatus.NOT_FOUND,
      );
    }

    let prerequisiteCourses = null;
    if (!_.isEmpty(request.prerequisiteIds)) {
      prerequisiteCourses = await this.courseRepository.findBy({
        id: In(request.prerequisiteIds),
      });
      if (prerequisiteCourses.length !== request.prerequisiteIds.length) {
        throw new HttpException(
          'Môn tiên quyết không tồn tại',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    const course = await this.courseRepository.findOneBy({
      id: request.courseId,
    });

    if (!course) {
      throw new HttpException('Môn học không tồn tại', HttpStatus.NOT_FOUND);
    }

    const queryRunner =
      this.syllabusRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      syllabus.primaryLecturer = primaryLecturer;
      syllabus.otherLecturers = otherLecturers;
      syllabus.course = course;
      syllabus.prerequisiteCourses = prerequisiteCourses;
      await queryRunner.manager.remove(oldReferenceMaterials);
      const savedReferenceMaterials = await queryRunner.manager.save(
        referenceMaterials,
      );
      syllabus.referenceMaterials = savedReferenceMaterials;
      const result = await queryRunner.manager.save(syllabus);
      await queryRunner.commitTransaction();
      return new ResponseBuilder<SyllabusResponseDto>()
        .withCode(HttpStatus.OK)
        .withMessage('Cập nhật thành công')
        .withData(result, SyllabusResponseDto)
        .build();
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

  async delete(id: number): Promise<ResponseDto<SyllabusResponseDto>> {
    const syllabus = await this.syllabusRepository.findOne({
      where: { id },
      relations: [
        'primaryLecturer',
        'otherLecturers',
        'prerequisite',
        'referenceMaterials',
      ],
    });
    if (!syllabus) {
      throw new HttpException('Không tồn tại', HttpStatus.NOT_FOUND);
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
        .withMessage('Xóa thành công')
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
    queryBuilder.leftJoinAndSelect('syllabus.prerequisite', 'prerequisite');
    queryBuilder.leftJoinAndSelect(
      'syllabus.referenceMaterials',
      'referenceMaterials',
    );
    if (request.search) {
      queryBuilder.where(
        new Brackets((qb) => {
          qb.where('syllabus.course_name LIKE :search', {
            search: `%${search}%`,
          }).orWhere('syllabus.course_code LIKE :search', {
            search: `%${search}%`,
          });
        }),
      );
    }
    if (filter) {
      switch (filter.filterBy) {
        case 'courseCode':
          queryBuilder.where('syllabus.course_code LIKE :search', {
            search: `%${filter.filterValue}%`,
          });
          break;
        case 'courseName':
          queryBuilder.where('syllabus.course_name LIKE :search', {
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
      .withMessage('Lấy danh sách thành công')
      .withData(data, SyllabusResponseDto)
      .withPage(page)
      .withLimit(limit)
      .withTotal(total)
      .build();
  }
}
