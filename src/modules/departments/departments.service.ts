import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/request/pagination-query.request.dto';
import { ResponseDto } from '../common/dto/response/base.response.dto';
import {
  PaginationResponseBuilder,
  ResponseBuilder,
} from '../common/util/helper.util';
import { DepartmentEntity } from './department.entity';
import { CreateDepartmentRequestDto } from './dto/request/create-department.request.dto';
import { DepartmentResponseDto } from './dto/response/department.response.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentsRepository: Repository<DepartmentEntity>,
  ) {}

  async getList(request: PaginationQueryDto) {
    const { page, limit } = request;
    const queryBuilder =
      this.departmentsRepository.createQueryBuilder('department');

    if (page && limit) {
      queryBuilder.skip((page - 1) * limit).take(limit);
    }

    const [departments, total] = await queryBuilder.getManyAndCount();

    return new PaginationResponseBuilder<DepartmentResponseDto>()
      .withCode(HttpStatus.OK)
      .withMessage('Get list of departments successfully')
      .withData(departments, DepartmentResponseDto)
      .withPage(page)
      .withLimit(limit)
      .withTotal(total)
      .build();
  }

  async get(id: number): Promise<ResponseDto<DepartmentResponseDto>> {
    const department = await this.departmentsRepository.findOne({
      where: { id },
    });

    return new ResponseBuilder<DepartmentResponseDto>()
      .withCode(HttpStatus.OK)
      .withMessage('Get department successfully')
      .withData(department, DepartmentResponseDto)
      .build();
  }

  async create(
    request: CreateDepartmentRequestDto,
  ): Promise<ResponseDto<DepartmentResponseDto>> {
    const department = this.departmentsRepository.create(request);

    const result = await this.departmentsRepository.save(department);
    return new ResponseBuilder<DepartmentResponseDto>()
      .withCode(HttpStatus.CREATED)
      .withMessage('Create department successfully')
      .withData(result, DepartmentResponseDto)
      .build();
  }
}
