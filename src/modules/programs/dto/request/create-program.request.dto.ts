import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString, ValidateNested } from 'class-validator';

export class Course {
  @IsInt()
  @ApiProperty()
  id: number;
}

export class CourseGroupRequestDto {
  @IsInt()
  @ApiProperty()
  id?: number;

  @IsString()
  @ApiProperty()
  name: string;

  @ApiProperty()
  @Type(() => CourseGroupRequestDto)
  groups: CourseGroupRequestDto[];

  @ApiProperty()
  @Type(() => Course)
  @IsArray()
  @ValidateNested({ each: true })
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
  @IsArray()
  @ValidateNested({ each: true })
  groups: CourseGroupRequestDto[];
}
