import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class Course {
  @IsInt()
  @ApiProperty()
  id: number;
}

export class CourseGroupRequestDto {
  @IsInt()
  @ApiProperty()
  @IsOptional()
  id?: number;

  @IsString()
  @ApiProperty()
  name: string;

  @ApiProperty()
  @Type(() => CourseGroupRequestDto)
  groups: CourseGroupRequestDto[];

  @ApiProperty()
  @Type(() => Course)
  @IsOptional()
  courses: Course[];
}

export class CreateProgramRequestDto {
  @ApiProperty()
  @IsString()
  vietnameseProgramName: string;

  @ApiProperty()
  @IsString()
  englishProgramName: string;

  @ApiProperty()
  @IsString()
  programCode: string;

  @ApiProperty()
  @IsString()
  degree: string;

  @ApiProperty()
  @IsInt()
  yearOf: number;

  @IsString()
  @ApiProperty()
  englishDegreeName: string;

  @ApiProperty()
  @IsString()
  vietnameseDegreeName: string;

  @ApiProperty()
  @IsString()
  standardOutput: string;

  @ApiProperty()
  @Type(() => CourseGroupRequestDto)
  groups: CourseGroupRequestDto[];
}
