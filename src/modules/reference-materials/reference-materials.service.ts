import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/request/pagination-query.request.dto';
import { CreateReferenceMaterialDto } from './dto/request/create-reference-material.dto';
import { ReferenceMaterialsEntity } from './reference-materials.entity';

@Injectable()
export class ReferenceMaterialsService {
  constructor(
    @InjectRepository(ReferenceMaterialsEntity)
    private readonly referenceMaterialsRepository: Repository<ReferenceMaterialsEntity>,
  ) {}

  async createMany(
    request: CreateReferenceMaterialDto[],
  ): Promise<ReferenceMaterialsEntity[]> {
    const referenceMaterials = request.map((referenceMaterial) => {
      const newReferenceMaterial =
        this.referenceMaterialsRepository.create(referenceMaterial);
      return newReferenceMaterial;
    });
    return await this.referenceMaterialsRepository.save(referenceMaterials);
  }

  async create(
    request: CreateReferenceMaterialDto,
  ): Promise<ReferenceMaterialsEntity> {
    const referenceMaterial = this.referenceMaterialsRepository.create(request);
    return await this.referenceMaterialsRepository.save(referenceMaterial);
  }

  async update(
    id: number,
    request: CreateReferenceMaterialDto,
  ): Promise<ReferenceMaterialsEntity> {
    const referenceMaterial = await this.referenceMaterialsRepository.findOne({
      where: {
        id,
      },
    });
    if (!referenceMaterial) {
      throw new HttpException(
        'Reference material not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.referenceMaterialsRepository.save({
      ...referenceMaterial,
      ...request,
    });
  }

  async get(id: number): Promise<ReferenceMaterialsEntity> {
    const referenceMaterial = await this.referenceMaterialsRepository.findOne({
      where: {
        id,
      },
    });
    if (!referenceMaterial) {
      throw new HttpException(
        'Reference material not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return referenceMaterial;
  }

  async delete(id: number): Promise<ReferenceMaterialsEntity> {
    const referenceMaterial = await this.referenceMaterialsRepository.findOne({
      where: {
        id,
      },
    });
    if (!referenceMaterial) {
      throw new HttpException(
        'Reference material not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.referenceMaterialsRepository.remove(referenceMaterial);
  }

  async getList(
    request: PaginationQueryDto,
  ): Promise<[ReferenceMaterialsEntity[], number, number, number]> {
    const { page, limit } = request;
    const [data, total] = await this.referenceMaterialsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return [data, page, limit, total];
  }
}
