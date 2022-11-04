import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsInt } from 'class-validator';
import {
  MaterialLanguageEnum,
  MaterialTypeEnum,
} from '../../reference-materials.constants';

export class CreateReferenceMaterialDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(MaterialLanguageEnum)
  language: MaterialLanguageEnum;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  releaseYear: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(MaterialTypeEnum)
  materialType: MaterialTypeEnum;
}
