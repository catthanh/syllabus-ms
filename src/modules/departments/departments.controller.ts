import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { PaginationQueryDto } from '../common/dto/request/pagination-query.request.dto';
import {
  PaginationResponseBuilder,
  ResponseBuilder,
} from '../common/util/helper.util';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentRequestDto } from './dto/request/create-department.request.dto';
import { UpdateDepartmentBody } from './dto/request/update-department.request.dto';
import { DepartmentResponseDto } from './dto/response/department.response.dto';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @ApiOperation({
    summary: 'Danh sách khoa',
    tags: ['Departments'],
  })
  @Get()
  async getList(@Query() query: PaginationQueryDto) {
    const [data, page, limit, total] = await this.departmentsService.getList(
      query,
    );
    return new PaginationResponseBuilder<DepartmentResponseDto>()
      .withCode(HttpStatus.OK)
      .withMessage('Get list of departments successfully')
      .withData(data, DepartmentResponseDto)
      .withPage(page)
      .withLimit(limit)
      .withTotal(total)
      .build();
  }

  @ApiOperation({
    summary: 'Chi tiết khoa',
    tags: ['Departments'],
  })
  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    const result = await this.departmentsService.get(id);
    return new ResponseBuilder<DepartmentResponseDto>()
      .withCode(HttpStatus.OK)
      .withMessage('Get department successfully')
      .withData(result, DepartmentResponseDto)
      .build();
  }

  @ApiOperation({
    summary: 'Tạo khoa',
    tags: ['Departments'],
  })
  @Post()
  async create(@Body() body: CreateDepartmentRequestDto) {
    const result = await this.departmentsService.create(body);
    return new ResponseBuilder<DepartmentResponseDto>()
      .withCode(HttpStatus.CREATED)
      .withMessage('Create department successfully')
      .withData(result, DepartmentResponseDto)
      .build();
  }

  @ApiOperation({
    summary: 'Cập nhật khoa',
    tags: ['Departments'],
  })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateDepartmentBody,
  ) {
    const result = await this.departmentsService.update(id, body);
    return new ResponseBuilder<DepartmentResponseDto>()
      .withCode(HttpStatus.OK)
      .withMessage('Update department successfully')
      .withData(result, DepartmentResponseDto)
      .build();
  }
}
