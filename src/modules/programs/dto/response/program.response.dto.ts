import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { SyllabusResponseDto } from '../../../syllabuses/dto/response/syllabus.response.dto';

export class CourseGroupResponseDto {
  @ApiProperty()
  @Expose()
  name: string;

  @Expose({
    name: 'groups',
  })
  @ApiProperty()
  @Type(() => CourseGroupResponseDto)
  children: CourseGroupResponseDto[];

  @ApiProperty()
  @Expose()
  @Type(() => SyllabusResponseDto)
  courses: SyllabusResponseDto[];
}
export class ProgramResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  vietnameseProgramName: string;

  @ApiProperty()
  @Expose()
  englishProgramName: string;

  @ApiProperty()
  @Expose()
  programCode: string;

  @ApiProperty()
  @Expose()
  degree: string;

  @ApiProperty()
  @Expose()
  yearOf: string;

  @ApiProperty()
  @Expose()
  englishDegreeName: string;

  @ApiProperty()
  @Expose()
  vietnameseDegreeName: string;

  @ApiProperty()
  @Expose()
  standardOutput: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  @Type(() => CourseGroupResponseDto)
  groups: CourseGroupResponseDto[];

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
