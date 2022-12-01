import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import JwtAuthenticationGuard from '../authentication/guard/jwt-authentication.guard';
import { PaginationQueryDto } from '../common/dto/request/pagination-query.request.dto';
import { ResponseBuilder } from '../common/util/helper.util';
import { CreateSyllabusRequestDto } from './dto/request/create-syllabus.request.dto';
import { UpdateSyllabusDto } from './dto/request/update-syllabus.request.dto';
import { SyllabusResponseDto } from './dto/response/syllabus.response.dto';
import { SyllabusesService } from './syllabuses.service';

@UseGuards(JwtAuthenticationGuard)
@Controller('syllabuses')
export class SyllabusesController {
  constructor(private readonly syllabusesService: SyllabusesService) {}

  @ApiOperation({
    summary: 'Tạo đề cương',
    tags: ['Syllabuses'],
  })
  @Post()
  async create(@Body() body: CreateSyllabusRequestDto) {
    const result = await this.syllabusesService.create(body);
    return new ResponseBuilder<SyllabusResponseDto>()
      .withCode(HttpStatus.CREATED)
      .withMessage('Tạo thành công')
      .withData(result, SyllabusResponseDto)
      .build();
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

  @ApiOperation({
    summary: 'Duyệt đề cương',
    tags: ['Syllabuses'],
  })
  @Patch(':id/approve')
  approve(@Param('id', ParseIntPipe) id: number) {
    return this.syllabusesService.approve(id);
  }

  @ApiOperation({
    summary: 'Ẩn đề cương',
    tags: ['Syllabuses'],
  })
  @Patch(':id/hide')
  hide(@Param('id', ParseIntPipe) id: number) {
    return this.syllabusesService.hide(id);
  }
}
