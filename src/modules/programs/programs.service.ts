import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramEntity } from './entities/programs.entity';
import { Repository } from 'typeorm';
import { PaginationResponseBuilder } from '../common/util/helper.util';
import { ProgramItemResponseDto } from './dto/response/programs-list.response.dto';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(ProgramEntity)
    private readonly programsRepository: Repository<ProgramEntity>,
  ) {}

  async getAll() {
    const queryBuilder = this.programsRepository.createQueryBuilder('program');
    const programs = await queryBuilder
      .distinctOn(['program_code'])
      .where('hidden = false')
      .getMany();
    return new PaginationResponseBuilder<ProgramItemResponseDto>()
      .withCode(HttpStatus.OK)
      .withMessage('Lấy danh sách chương trình đào tạo thành công')
      .withData(programs, ProgramItemResponseDto)
      .build();
  }
}
