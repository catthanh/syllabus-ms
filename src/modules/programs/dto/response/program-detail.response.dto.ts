import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { CourseTimeDistribution } from '../../../syllabuses/interface/course-time-distribution.interface';
import { SyllabusEntity } from '../../../syllabuses/entities/syllabus.entity';
import { SyllabusResponseDto } from '../../../syllabuses/dto/response/syllabus.response.dto';

export class GroupDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  groupName: string;

  @ApiProperty()
  @Expose()
  @Type(() => GroupCourseDto)
  groupCourses: GroupCourseDto[];
}

export class SyllabusDto {
  @ApiProperty()
  @Expose()
  courseName: string;

  @ApiProperty()
  @Expose()
  courseCode: string;

  @ApiProperty()
  @Expose()
  courseCredit: number;

  @ApiProperty()
  @Expose()
  courseTimeDistribution: CourseTimeDistribution;

  @ApiPropertyOptional()
  @Expose()
  @Type(() => SyllabusResponseDto)
  prerequisite: SyllabusResponseDto;
}

export class GroupCourseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose({ name: 'syllabus', groups: ['syllabus'] })
  @Type(() => SyllabusDto)
  course: string;
}

export class KnowledgeBlockDto {
  @ApiProperty()
  @Expose()
  knowledgeBlockName: string;
}

export class KnowledgeBlocksProgramDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose({ name: 'knowledgeBlock' })
  @Type(() => KnowledgeBlockDto)
  @Transform(({ value }) => value.knowledgeBlockName)
  knowledgeBlockName: KnowledgeBlockDto;

  @ApiProperty()
  @Expose()
  @Type(() => GroupDto)
  groups: GroupDto[];
}

export class DetailProgramResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  programCode: string;

  @ApiProperty()
  @Expose()
  vietnameseName: string;

  @ApiProperty()
  @Expose()
  englishName: string;

  @ApiProperty()
  @Expose()
  vietnameseDegreeName: string;

  @ApiProperty()
  @Expose()
  englishDegreeName: string;

  @ApiProperty()
  @Expose()
  year: number;

  @ApiProperty()
  @Expose()
  hidden: boolean;

  @ApiProperty()
  @Expose()
  version: number;

  @ApiProperty()
  @Expose()
  @Type(() => KnowledgeBlocksProgramDto)
  knowledgeBlocksProgram: KnowledgeBlocksProgramDto[];
}
