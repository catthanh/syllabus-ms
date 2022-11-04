import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateReferenceMaterialDto } from './dto/request/create-reference-material.dto';
import { ReferenceMaterialsEntity } from './reference-materials.entity';

@Injectable()
export class ReferenceMaterialsService {
  constructor(
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
}
