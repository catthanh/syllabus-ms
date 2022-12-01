import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/request/pagination-query.request.dto';
import { DepartmentEntity } from './department.entity';
import { CreateDepartmentRequestDto } from './dto/request/create-department.request.dto';
import { UpdateDepartmentBody } from './dto/request/update-department.request.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentsRepository: Repository<DepartmentEntity>,
  ) {}

  /**
   *
   * @param request
   * @returns [data, page, limit, total]
   */
  async getList(
    request: PaginationQueryDto,
  ): Promise<[DepartmentEntity[], number, number, number]> {
    const { page, limit } = request;
    const queryBuilder =
      this.departmentsRepository.createQueryBuilder('department');

    if (page && limit) {
      queryBuilder.skip((page - 1) * limit).take(limit);
    }

    const [data, total] = await queryBuilder.getManyAndCount();

    return [data, page, limit, total];
  }

  async get(id: number): Promise<DepartmentEntity> {
    const department = await this.departmentsRepository.findOne({
      where: { id },
    });

    if (!department) {
      throw new HttpException('Department not found', HttpStatus.NOT_FOUND);
    }
    return department;
  }

  async create(request: CreateDepartmentRequestDto): Promise<DepartmentEntity> {
    const department = this.departmentsRepository.create(request);

    return await this.departmentsRepository.save(department);
  }

  async update(
    id: number,
    request: UpdateDepartmentBody,
  ): Promise<DepartmentEntity> {
    const department = await this.departmentsRepository.findOne({
      where: { id },
    });

    if (!department) {
      throw new HttpException('Department not found', HttpStatus.NOT_FOUND);
    }

    return await this.departmentsRepository.save({
      ...department,
      ...request,
    });
  }
}
