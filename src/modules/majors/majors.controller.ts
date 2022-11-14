import {
  Body,
  Controller,
  Delete,
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
import { CreateMajorRequestDto } from './dto/request/create-major.request.dto';
import { UpdateMajorRequestDto } from './dto/request/update-major.request.dto';
import { MajorResponseDto } from './dto/response/major.response.dto';
import { MajorsService } from './majors.service';

@Controller('majors')
export class MajorsController {
  constructor(private readonly majorsService: MajorsService) {}

  @ApiOperation({
    summary: 'Danh sách ngành',
    tags: ['Majors'],
  })
  @Get()
  async getList(@Query() query: PaginationQueryDto) {
    const [data, page, limit, total] = await this.majorsService.getList(query);
    return new PaginationResponseBuilder<MajorResponseDto>()
      .withCode(HttpStatus.OK)
      .withMessage('Get list of majors successfully')
      .withData(data, MajorResponseDto)
      .withPage(page)
      .withLimit(limit)
      .withTotal(total)
      .build();
  }

  @ApiOperation({
    summary: 'Chi tiết ngành',
    tags: ['Majors'],
  })
  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    const result = await this.majorsService.get(id);
    return new ResponseBuilder<MajorResponseDto>()
      .withCode(HttpStatus.OK)
      .withMessage('Get major successfully')
      .withData(result, MajorResponseDto)
      .build();
  }

  @ApiOperation({
    summary: 'Tạo ngành',
    tags: ['Majors'],
  })
  @Post()
  async create(@Body() request: CreateMajorRequestDto) {
    const result = await this.majorsService.create(request);
    return new ResponseBuilder<MajorResponseDto>()
      .withCode(HttpStatus.CREATED)
      .withMessage('Create major successfully')
      .withData(result, MajorResponseDto)
      .build();
  }

  @ApiOperation({
    summary: 'Cập nhật ngành',
    tags: ['Majors'],
  })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: UpdateMajorRequestDto,
  ) {
    const result = await this.majorsService.update(id, request);
    return new ResponseBuilder<MajorResponseDto>()
      .withCode(HttpStatus.OK)
      .withMessage('Update major successfully')
      .withData(result, MajorResponseDto)
      .build();
  }

  @ApiOperation({
    summary: 'Xóa ngành',
    tags: ['Majors'],
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.majorsService.delete(id);
    return new ResponseBuilder()
      .withCode(HttpStatus.OK)
      .withMessage('Delete major successfully')
      .build();
  }
}
