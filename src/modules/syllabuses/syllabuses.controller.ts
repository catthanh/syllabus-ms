import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { PaginationQueryDto } from '../common/dto/request/pagination-query.request.dto';
import { CreateSyllabusRequestDto } from './dto/request/create-syllabus.request.dto';
import { UpdateSyllabusDto } from './dto/request/update-syllabus.request.dto';
import { SyllabusesService } from './syllabuses.service';

@Controller('syllabuses')
export class SyllabusesController {
  constructor(private readonly syllabusesService: SyllabusesService) {}

  @ApiOperation({
    summary: 'Tạo đề cương',
    tags: ['Syllabuses'],
  })
  @Post()
  create(@Body() body: CreateSyllabusRequestDto) {
    return this.syllabusesService.create(body);
  }

  @ApiOperation({
    summary: 'Chi tiet đề cương',
    tags: ['Syllabuses'],
  })
  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.syllabusesService.get(id);
  }

  @ApiOperation({
    summary: 'Danh sách đề cương',
    tags: ['Syllabuses'],
  })
  @Get()
  getAll(@Query() query: PaginationQueryDto) {
    return this.syllabusesService.getList(query);
  }

  @ApiOperation({
    summary: 'Cập nhật đề cương',
    tags: ['Syllabuses'],
  })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateSyllabusDto,
  ) {
    return this.syllabusesService.update(id, body);
  }

  @ApiOperation({
    summary: 'Xóa đề cương',
    tags: ['Syllabuses'],
  })
  @Delete(':id/delete')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.syllabusesService.delete(id);
  }
}
