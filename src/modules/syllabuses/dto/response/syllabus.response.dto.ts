import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ReferenceMaterialResponseDto } from '../../../reference-materials/dto/response/reference-material.response.dto';
import { UserResponseDto } from '../../../users/dto/response/user.response.dto';
import { CourseOutcomeStandard } from '../../interface/course-outcome-standard.interface';
import { CourseSchedule } from '../../interface/course-schedule.interface';
import { CourseTimeDistribution } from '../../interface/course-time-distribution.interface';
import { TeachingSchedule } from '../../interface/teaching-schedule.interface';
import { CourseType } from '../../syllabuses.constants';
import {
  AssessmentFormDto,
  CourseOutcomeStandardDto,
  CourseScheduleDto,
  CourseTestScheduleDto,
  CourseTimeDistributionDto,
  TeachingScheduleDto,
} from '../request/create-syllabus.request.dto';

export class SyllabusResponseDto {
  @ApiProperty()
  @Expose()
  @Type(() => UserResponseDto)
  primaryLecturer: UserResponseDto;

  @ApiPropertyOptional()
  @Expose()
  @Type(() => UserResponseDto)
  otherLecturers: UserResponseDto[];

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
  @Type(() => CourseTimeDistributionDto)
  courseTimeDistribution: CourseTimeDistribution;

  @ApiPropertyOptional()
  @Expose()
  @Type(() => SyllabusResponseDto)
  prerequisite: SyllabusResponseDto;

  @ApiProperty()
  @Expose()
  courseType: CourseType;

  @ApiProperty()
  @Expose()
  department: number;

  @ApiProperty()
  @Expose()
  courseTarget: string;

  @ApiProperty()
  @Expose()
  @Type(() => CourseOutcomeStandardDto)
  outcomeStandard: CourseOutcomeStandard[];

  @ApiProperty()
  @Expose()
  courseSummary: string;

  @ApiProperty()
  @Expose()
  courseContent: string;

  @ApiProperty()
  @Expose()
  @Type(() => ReferenceMaterialResponseDto)
  referenceMaterials: ReferenceMaterialResponseDto[];

  @ApiProperty()
  @Expose()
  @Type(() => TeachingScheduleDto)
  teachingSchedule: TeachingSchedule[];

  @ApiProperty()
  @Expose()
  @Type(() => CourseScheduleDto)
  detailedTeachingSchedule: CourseSchedule[];

  @ApiProperty()
  @Expose()
  coursePolicy: string;

  @ApiProperty()
  @Expose()
  @Type(() => AssessmentFormDto)
  midtermAssessment: AssessmentFormDto[];

  @ApiProperty()
  @Expose()
  finalAssessment: AssessmentFormDto;

  @ApiProperty()
  @Expose()
  assessmentCriteria: string;

  @ApiProperty()
  @Expose()
  midtermAssessmentSchedule: CourseTestScheduleDto;

  @ApiProperty()
  @Expose()
  finalAssessmentSchedule: CourseTestScheduleDto;
}
