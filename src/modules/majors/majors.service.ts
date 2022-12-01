import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/request/pagination-query.request.dto';
import { CreateMajorRequestDto } from './dto/request/create-major.request.dto';
import { UpdateMajorRequestDto } from './dto/request/update-major.request.dto';
import { MajorEntity } from './major.entity';

@Injectable()
export class MajorsService {
  constructor(
    @InjectRepository(MajorEntity)
    private readonly majorsRepository: Repository<MajorEntity>,
  ) {}

  async create(request: CreateMajorRequestDto): Promise<MajorEntity> {
    const major = this.majorsRepository.create(request);
    return await this.majorsRepository.save(major);
  }

  async update(
    id: number,
    request: UpdateMajorRequestDto,
  ): Promise<MajorEntity> {
    const major = await this.majorsRepository.findOne({ where: { id } });
    if (!major) {
      throw new HttpException('Major not found', HttpStatus.NOT_FOUND);
    }
    return await this.majorsRepository.save({ ...major, ...request });
  }

  async delete(id: number) {
    const major = await this.majorsRepository.findOne({ where: { id } });
    if (!major) {
      throw new HttpException('Major not found', HttpStatus.NOT_FOUND);
    }
    return await this.majorsRepository.remove(major);
  }

  async get(id: number): Promise<MajorEntity> {
    const major = await this.majorsRepository.findOne({
      where: { id },
      relations: ['department', 'programs'],
    });
    if (!major) {
      throw new HttpException('Major not found', HttpStatus.NOT_FOUND);
    }
    return major;
  }

  async getList(
    query: PaginationQueryDto,
  ): Promise<[MajorEntity[], number, number, number]> {
    const { page, limit } = query;
    const queryBuilder = this.majorsRepository.createQueryBuilder('major');
    queryBuilder.leftJoinAndSelect('major.department', 'department');
    queryBuilder.leftJoinAndSelect('major.programs', 'programs');

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
