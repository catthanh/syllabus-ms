import { PartialType } from '@nestjs/swagger';
import { CreateReferenceMaterialDto } from './create-reference-material.dto';

export class UpdateReferenceMaterialBody extends PartialType(
  CreateReferenceMaterialDto,
) {}
