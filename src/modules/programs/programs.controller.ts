import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ProgramsService } from './programs.service';

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
}
