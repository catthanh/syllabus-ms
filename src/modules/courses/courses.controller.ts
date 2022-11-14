import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Query,
  Delete,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { PaginationQueryDto } from '../common/dto/request/pagination-query.request.dto';
import { SuccessResponseDto } from '../common/dto/response/success.response.dto';
import {
  PaginationResponseBuilder,
  ResponseBuilder,
} from '../common/util/helper.util';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/request/create-course.request.dto';
import { CourseResponseDto } from './dto/response/cousre.response.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @ApiOperation({
    summary: 'Create courses',
    tags: ['courses'],
  })
  @Post()
  async create(@Body() newCourse: CreateCourseDto) {
    const result = await this.coursesService.create(newCourse);
    return new ResponseBuilder<CourseResponseDto>()
      .withCode(HttpStatus.CREATED)
      .withData(result, CourseResponseDto)
      .withMessage('Create course successfully')
      .build();
  }

  @ApiOperation({
    summary: 'Update courses',
    tags: ['courses'],
  })
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() course: any) {
    const result = await this.coursesService.update(id, course);
    return new ResponseBuilder<CourseResponseDto>()
      .withCode(HttpStatus.OK)
      .withData(result, CourseResponseDto)
      .withMessage('Update course successfully')
      .build();
  }

  @ApiOperation({
    summary: 'Get course details',
    tags: ['courses'],
  })
  @Get()
  async get(@Param('id', ParseIntPipe) id: number) {
    const result = await this.coursesService.get(id);
    return new ResponseBuilder<CourseResponseDto>()
      .withCode(HttpStatus.OK)
      .withData(result, CourseResponseDto)
      .withMessage('Get course successfully')
      .build();
  }

  @ApiOperation({
    summary: 'Delete course',
    tags: ['courses'],
  })
  @Delete()
  async delete(@Param('id', ParseIntPipe) id: number) {
    if (await this.coursesService.delete(id)) {
      return new SuccessResponseDto();
    }
  }

  @ApiOperation({
    summary: 'Get courses list',
    tags: ['courses'],
  })
  @Get()
  async getList(@Query() query: PaginationQueryDto) {
    const [data, page, limit, total] = await this.coursesService.getList(query);
    return new PaginationResponseBuilder<CourseResponseDto>()
      .withCode(HttpStatus.OK)
      .withMessage('Lấy danh sách thành công')
      .withData(data, CourseResponseDto)
      .withPage(page)
      .withLimit(limit)
      .withTotal(total)
      .build();
  }
}
