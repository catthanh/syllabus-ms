import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/request/pagination-query.request.dto';
import { MajorEntity } from '../majors/major.entity';
import { CreateProgramRequestDto } from './dto/request/create-program.request.dto';
import { UpdateProgramBody } from './dto/request/update-program.request.dto';
import { ProgramEntity } from './program.entity';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(ProgramEntity)
    private readonly programRepository: Repository<ProgramEntity>,
    @InjectRepository(MajorEntity)
    private readonly majorRepository: Repository<MajorEntity>,
  ) {}

  async create(request: CreateProgramRequestDto) {
    const major = await this.majorRepository.findOne({
      where: { id: request.majorId },
    });
    if (!major) {
      throw new NotFoundException('Major not found');
    }
    const program = this.programRepository.create({
      ...request,
      major,
    });
    return await this.programRepository.save(program);
  }

  async update(id: number, request: UpdateProgramBody) {
    const major = await this.majorRepository.findOne({
      where: { id: request.majorId },
    });
    if (!major) {
      throw new NotFoundException('Major not found');
    }
    const program = await this.programRepository.findOne({
      where: { id },
    });
    if (!program) {
      throw new NotFoundException('Program not found');
    }
    const updatedProgram = this.programRepository.create({
      ...program,
      ...request,
      major,
    });
    return await this.programRepository.save(updatedProgram);
  }

  async delete(id: number) {
    const program = await this.programRepository.findOne({
      where: { id },
    });
    if (!program) {
      throw new NotFoundException('Program not found');
    }
    return await this.programRepository.remove(program);
  }

  async get(id: number) {
    const program = await this.programRepository.findOne({
      where: { id },
    });
    if (!program) {
      throw new NotFoundException('Program not found');
    }
    return program;
  }

  async getList(
    request: PaginationQueryDto,
  ): Promise<[ProgramEntity[], number, number, number]> {
    const { page, limit, search, sort, filter } = request;
    const queryBuilder = this.programRepository.createQueryBuilder('program');
    queryBuilder.leftJoinAndSelect('program.major', 'major');
    if (request.search) {
      queryBuilder.where(
        new Brackets((qb) => {
          qb.where('program.name LIKE :search', {
            search: `%${search}%`,
          });
        }),
      );
    }
    if (limit) {
      queryBuilder.take(limit);
    }
    if (page) {
      queryBuilder.skip((page - 1) * limit);
    }
    const [data, total] = await queryBuilder.getManyAndCount();
    return [data, page, limit, total];
  }
}
