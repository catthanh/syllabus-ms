import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class Course {
  @ApiProperty()
  id: number;
}

export class CourseGroupRequestDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  @Type(() => CourseGroupRequestDto)
  groups: CourseGroupRequestDto[];

  @ApiProperty()
  @Type(() => Course)
  courses: Course[];
}

export class CreateProgramRequestDto {
  @ApiProperty()
  majorId: number;

  @ApiProperty()
  vietnameseProgramName: string;

  @ApiProperty()
  englishProgramName: string;

  @ApiProperty()
  programCode: string;

  @ApiProperty()
  degree: string;

  @ApiProperty()
  yearOf: number;

  @ApiProperty()
  englishDegreeName: string;

  @ApiProperty()
  vietnameseDegreeName: string;

  @ApiProperty()
  standardOutput: string;

  @ApiProperty()
  @Type(() => CourseGroupRequestDto)
  @ValidateNested({ each: true })
  groups: CourseGroupRequestDto[];
}
