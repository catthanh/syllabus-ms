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
import { CreateProgramRequestDto } from './dto/request/create-program.request.dto';
import { ProgramResponseDto } from './dto/response/program.response.dto';
import { ProgramsService } from './programs.service';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}
  @ApiOperation({
    summary: 'Create program',
    tags: ['Programs'],
  })
  @Post()
  async create(@Body() request: CreateProgramRequestDto) {
    const data = await this.programsService.create(request);
    return new ResponseBuilder<ProgramResponseDto>()
      .withCode(HttpStatus.CREATED)
      .withData(data, ProgramResponseDto)
      .withMessage('Program created successfully')
      .build();
  }

  @ApiOperation({
    summary: 'Update program',
    tags: ['Programs'],
  })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: CreateProgramRequestDto,
  ) {
    const data = await this.programsService.update(id, request);
    return new ResponseBuilder<ProgramResponseDto>()
      .withCode(HttpStatus.OK)
      .withData(data, ProgramResponseDto)
      .withMessage('Program updated successfully')
      .build();
  }

  @ApiOperation({
    summary: 'Get program',
    tags: ['Programs'],
  })
  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    const data = await this.programsService.get(id);
    return new ResponseBuilder<ProgramResponseDto>()
      .withCode(HttpStatus.OK)
      .withData(data, ProgramResponseDto)
      .withMessage('Program retrieved successfully')
      .build();
  }

  @ApiOperation({
    summary: 'Delete program',
    tags: ['Programs'],
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.programsService.delete(id);
    return new ResponseBuilder<ProgramResponseDto>()
      .withCode(HttpStatus.OK)
      .withMessage('Program deleted successfully')
      .build();
  }

  @ApiOperation({
    summary: 'Get list of programs',
    tags: ['Programs'],
  })
  @Get()
  async getList(@Query() request: PaginationQueryDto) {
    const [data, page, limit, total] = await this.programsService.getList(
      request,
    );
    return new PaginationResponseBuilder()
      .withCode(HttpStatus.OK)
      .withData(data, ProgramResponseDto)
      .withPage(page)
      .withLimit(limit)
      .withTotal(total)
      .withMessage('Programs retrieved successfully')
      .build();
  }
}
