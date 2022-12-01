import {
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ProgramsService } from './programs.service';
import { DetailProgramRequestDto } from './dto/request/program-detail.request.dto';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @ApiOperation({
    summary: 'Danh sách chương trình đào tạo',
    tags: ['Programs'],
  })
  @Get()
  async getAll() {
    return this.programsService.getAll();
  }

  @ApiOperation({
    summary: 'Chi tiết chương trình đào tạo',
    tags: ['Programs'],
  })
  @Get(':code')
  @UsePipes(new ValidationPipe({ transform: true }))
  async get(
    @Param('code') code: string,
    @Query() data_req: DetailProgramRequestDto,
  ) {
    return this.programsService.get(code, data_req);
  }
}
