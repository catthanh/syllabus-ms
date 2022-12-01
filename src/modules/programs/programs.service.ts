import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramEntity } from './entities/programs.entity';
import { Repository } from 'typeorm';
import {
  PaginationResponseBuilder,
  ResponseBuilder,
} from '../common/util/helper.util';
import { ProgramItemResponseDto } from './dto/response/programs-list.response.dto';
import { ResponseDto } from '../common/dto/response/base.response.dto';
import { DetailProgramRequestDto } from './dto/request/program-detail.request.dto';
import { DetailProgramResponseDto } from './dto/response/program-detail.response.dto';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(ProgramEntity)
    private readonly programsRepository: Repository<ProgramEntity>,
  ) {}

  async getAll(): Promise<ResponseDto<ProgramItemResponseDto[]>> {
    const queryBuilder = this.programsRepository.createQueryBuilder('programs');
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

  async get(code: string, data_req: DetailProgramRequestDto) {
    const queryBuilder = this.programsRepository.createQueryBuilder('program');
    queryBuilder.leftJoinAndSelect(
      'program.knowledgeBlocksProgram',
      'knowledgeBlocksProgram',
    );
    queryBuilder.leftJoinAndSelect(
      'knowledgeBlocksProgram.knowledgeBlock',
      'knowledgeBlock',
    );
    queryBuilder.leftJoinAndSelect('knowledgeBlocksProgram.groups', 'groups');
    queryBuilder.leftJoinAndSelect('groups.groupCourses', 'groupCourses');
    queryBuilder.leftJoinAndSelect('groupCourses.syllabus', 'syllabus');
    queryBuilder.where(`program_code = '${code}'`);

    const program = await queryBuilder
      .andWhere(`version = ${data_req.version}`)
      .getOne();

    if (!program) {
      throw new HttpException('Không tồn tại', HttpStatus.NOT_FOUND);
    }

    return new ResponseBuilder<DetailProgramResponseDto>()
      .withCode(HttpStatus.OK)
      .withMessage('Thành công')
      .withData(program, DetailProgramResponseDto)
      .build();
  }
}
