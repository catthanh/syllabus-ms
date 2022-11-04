import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { PaginationQueryDto } from '../common/dto/request/pagination-query.request.dto';
import { DepartmentsService } from './departments.service';

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
}
