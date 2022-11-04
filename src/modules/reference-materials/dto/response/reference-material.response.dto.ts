import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  MaterialLanguageEnum,
  MaterialTypeEnum,
} from '../../reference-materials.constants';

export class ReferenceMaterialResponseDto {
  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  language: MaterialLanguageEnum;

  @ApiProperty()
  @Expose()
  releaseYear: number;

  @ApiProperty()
  @Expose()
  materialType: MaterialTypeEnum;
}
