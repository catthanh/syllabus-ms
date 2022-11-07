import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { PaginationQueryDto } from '../common/dto/request/pagination-query.request.dto';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentRequestDto } from './dto/request/create-department.request.dto';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @ApiOperation({
    summary: 'Danh sách khoa',
    tags: ['Departments'],
  })
  @Get()
  async getList(@Query() query: PaginationQueryDto) {
    return this.departmentsService.getList(query);
  }

  @ApiOperation({
    summary: 'Chi tiết khoa',
    tags: ['Departments'],
  })
  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.departmentsService.get(id);
  }

  @ApiOperation({
    summary: 'Tạo khoa',
    tags: ['Departments'],
  })
  @Post()
  async create(@Body() body: CreateDepartmentRequestDto) {
    return this.departmentsService.create(body);
  }
}
