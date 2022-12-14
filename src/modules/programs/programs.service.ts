import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Brackets, DataSource, In, Repository, TreeRepository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/request/pagination-query.request.dto';
import { CreateProgramRequestDto } from './dto/request/create-program.request.dto';
import { UpdateProgramBody } from './dto/request/update-program.request.dto';
import { CourseGroupEntity } from './entities/course-group.entity';
import { ProgramEntity } from './program.entity';
import { keyBy, uniq } from 'lodash';
import { ProgramStatusEnum } from './programs.constant';
import { SyllabusEntity } from '../syllabuses/entities/syllabus.entity';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(ProgramEntity)
    private readonly programRepository: Repository<ProgramEntity>,
    @InjectRepository(SyllabusEntity)
    private readonly syllabusRepository: Repository<SyllabusEntity>,
    @InjectRepository(CourseGroupEntity)
    private readonly courseGroupRepository: TreeRepository<CourseGroupEntity>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(request: CreateProgramRequestDto) {
    // check program exist
    console.log(request);
    const existProgram = await this.programRepository.find({
      where: {
        programCode: request.programCode,
      },
    });

    if (existProgram.length > 0) {
      throw new HttpException(
        'Mã chương trình đã tồn tại',
        HttpStatus.BAD_REQUEST,
      );
    }

    //
    // check course exist
    const queue = [...request.groups];
    const courseIds = [];
    while (queue.length) {
      const courseGroup = queue.shift();
      if (courseGroup.courses) {
        courseIds.push(...courseGroup.courses.map((course) => course.id));
      }
      if (courseGroup.groups) {
        queue.push(...courseGroup.groups);
      }
    }

    // check course exist
    const existCourses = await this.syllabusRepository.find({
      where: {
        id: In(uniq(courseIds)),
      },
      relations: ['prerequisiteCourses'],
    });
    console.log('aaaaaaaaaaaaaaa');

    if (existCourses.length !== uniq(courseIds).length) {
      throw new NotFoundException('Không tìm thấy môn học');
    }
    const existCoursesMap = keyBy(existCourses, 'id');

    const program = this.programRepository.create({
      ...request,
    });
    delete program.groups;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      console.log('sasaassssssssssssssssssssss');
      const queue = [request.groups];
      const tempProgram = await queryRunner.manager.save(program);
      console.log('sasaassssssssssssssssssssss');
      const courseGroupEntitiesByLevel = [];
      const courseGroupParentByLevel = [];
      courseGroupParentByLevel.push(queue[0].map(() => null));
      while (queue.length) {
        const courseGroups = queue.shift();
        const courseGroupEntities = courseGroups.map((courseGroup, index) => {
          const courseGroupEntity = this.courseGroupRepository.create({
            name: courseGroup.name,
            program: tempProgram,
          });
          courseGroupEntity.courses = courseGroup.courses?.map(
            (course) => existCoursesMap[course.id],
          );
          courseGroupEntity.parent =
            courseGroupParentByLevel[courseGroupParentByLevel.length - 1][
              index
            ];
          return courseGroupEntity;
        });
        const saved = await queryRunner.manager.save(courseGroupEntities);
        courseGroupEntitiesByLevel.push(saved);
        queue.push([]);
        courseGroupParentByLevel.push([]);
        courseGroups.forEach((courseGroup, index) => {
          if (courseGroup.groups) {
            queue[queue.length - 1].push(...courseGroup.groups);
            courseGroupParentByLevel[courseGroupParentByLevel.length - 1].push(
              ...courseGroup.groups.map(() => saved[index]),
            );
          }
        });
        if (queue[queue.length - 1].length === 0) {
          queue.pop();
          courseGroupParentByLevel.pop();
        }
      }
      await queryRunner.commitTransaction();
      const roots = courseGroupEntitiesByLevel[0];
      console.log(roots);
      const trees = await Promise.all(
        roots.map((root) =>
          this.courseGroupRepository.findDescendantsTree(root, {
            relations: ['courses', 'courses.prerequisiteCourses'],
          }),
        ),
      );
      tempProgram.groups = trees;

      return tempProgram;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: number, request: UpdateProgramBody) {
    const program = await this.programRepository.findOne({
      where: { id },
    });
    if (!program) {
      throw new NotFoundException('Program not found');
    }

    // check course exist
    const queue = [...request.groups];
    const courseIds = [];
    while (queue.length) {
      const courseGroup = queue.shift();
      if (courseGroup.courses) {
        courseIds.push(...courseGroup.courses?.map((course) => course.id));
      }
      if (courseGroup.groups) {
        queue.push(...courseGroup.groups);
      }
    }
    const existCourses = await this.syllabusRepository.find({
      where: {
        id: In(uniq(courseIds)),
      },
      relations: ['prerequisiteCourses'],
    });
    console.log('aaaaaaaaaaaaaaa');

    if (existCourses.length !== uniq(courseIds).length) {
      throw new NotFoundException('Không tìm thấy môn học');
    }
    const existCoursesMap = keyBy(existCourses, 'id');

    const updatedProgram = this.programRepository.create({
      ...program,
      ...request,
    });
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      console.log('sasaassssssssssssssssssssss');
      const queue = [request.groups];
      const tempProgram = await queryRunner.manager.save(updatedProgram);
      console.log('sasaassssssssssssssssssssss');
      const courseGroupEntitiesByLevel = [];
      const courseGroupParentByLevel = [];
      courseGroupParentByLevel.push(queue[0].map(() => null));
      while (queue.length) {
        const courseGroups = queue.shift();
        const courseGroupEntities = courseGroups.map((courseGroup, index) => {
          const courseGroupEntity = this.courseGroupRepository.create({
            id: courseGroup.id,
            name: courseGroup.name,
            program: tempProgram,
          });
          courseGroupEntity.courses = courseGroup.courses.map(
            (course) => existCoursesMap[course.id],
          );
          courseGroupEntity.parent =
            courseGroupParentByLevel[courseGroupParentByLevel.length - 1][
              index
            ];
          return courseGroupEntity;
        });
        const saved = await queryRunner.manager.save(courseGroupEntities);
        courseGroupEntitiesByLevel.push(saved);
        queue.push([]);
        courseGroupParentByLevel.push([]);
        courseGroups.forEach((courseGroup, index) => {
          if (courseGroup.groups) {
            queue[queue.length - 1].push(...courseGroup.groups);
            courseGroupParentByLevel[courseGroupParentByLevel.length - 1].push(
              ...courseGroup.groups.map(() => saved[index]),
            );
          }
        });
        if (queue[queue.length - 1].length === 0) {
          queue.pop();
          courseGroupParentByLevel.pop();
        }
      }
      await queryRunner.commitTransaction();
      const roots = courseGroupEntitiesByLevel[0];
      console.log(roots);
      const trees = await Promise.all(
        roots.map((root) =>
          this.courseGroupRepository.findDescendantsTree(root, {
            relations: ['courses', 'courses.prerequisiteCourses'],
          }),
        ),
      );
      tempProgram.groups = trees;

      return tempProgram;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async delete(id: number) {
    const program = await this.programRepository.findOne({
      where: { id },
    });
    if (!program) {
      throw new NotFoundException('Program not found');
    }
    return await this.programRepository.remove(program);
  }

  async get(id: number) {
    const program = await this.programRepository.findOne({
      where: { id },
      relations: [
        'groups',
        'groups.courses',
        'groups.courses.prerequisiteCourses',
      ],
    });
    const roots = program.groups;
    const trees = await Promise.all(
      roots.map((root) =>
        this.courseGroupRepository.findDescendantsTree(root, {
          relations: ['courses', 'courses.prerequisiteCourses'],
        }),
      ),
    );
    program.groups = trees;
    console.log(roots);
    if (!program) {
      throw new NotFoundException('Program not found');
    }
    return program;
  }

  async getList(
    request: PaginationQueryDto,
  ): Promise<[ProgramEntity[], number, number, number]> {
    const { page, limit, search, sort, filter } = request;
    const queryBuilder = this.programRepository.createQueryBuilder('program');
    queryBuilder.leftJoinAndSelect('program.groups', 'groups');
    if (request.search) {
      queryBuilder.where(
        new Brackets((qb) => {
          qb.where('program.name ILIKE :search', {
            search: `%${search}%`,
          });
        }),
      );
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
