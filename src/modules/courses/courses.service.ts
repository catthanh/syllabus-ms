import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/request/pagination-query.request.dto';
import { CourseEntity } from './course.entity';
import { CreateCourseDto } from './dto/request/create-course.request.dto';
import { UpdateCourseBody } from './dto/request/update-course.request.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {}

  async create(course: CreateCourseDto) {
    const existedCourse = await this.courseRepository.findOne({
      where: {
        code: course.code,
      },
    });
    if (existedCourse) {
      throw new HttpException('Course code already existed', 400);
    }
    const newCourse = this.courseRepository.create(course);

    return this.courseRepository.save(newCourse);
  }

  async update(id: number, course: UpdateCourseBody) {
    const existCourse = await this.courseRepository.findOne({
      where: { id },
    });
    if (!existCourse) {
      return null;
    }
    return this.courseRepository.save({
      ...existCourse,
      ...course,
    });
  }

  async get(id: number) {
    return this.courseRepository.findOne({
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    return this.courseRepository.delete(id);
  }

  /**
   *
   * @param request
   * @returns [data , page, limit, total]
   */
  async getList(
    request: PaginationQueryDto,
  ): Promise<[CourseEntity[], number, number, number]> {
    const { page, limit, search, sort, filter } = request;
    const queryBuilder = this.courseRepository.createQueryBuilder('course');
    queryBuilder.leftJoinAndSelect('course.syllabuses', 'syllabuses');
    queryBuilder.leftJoinAndSelect('course.programs', 'programs');
    if (request.search) {
      queryBuilder.where(
        new Brackets((qb) => {
          qb.where('course.name ILIKE :search', {
            search: `%${search}%`,
          }).orWhere('course.code ILIKE :search', {
            search: `%${search}%`,
          });
        }),
      );
    }
    if (filter) {
      switch (filter.filterBy) {
        case 'courseCode':
          queryBuilder.where('course.code ILIKE :search', {
            search: `%${filter.filterValue}%`,
          });
          break;
        case 'courseName':
          queryBuilder.where('course.name ILIKE :search', {
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
            queryBuilder.addOrderBy('course.code', sortDirection);
            break;
          case 'courseName':
            queryBuilder.addOrderBy('course.name', sortDirection);
            break;
          case 'id':
          default:
            queryBuilder.addOrderBy('course.id', 'ASC');
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
    return [data, page, limit, total];
  }
}
