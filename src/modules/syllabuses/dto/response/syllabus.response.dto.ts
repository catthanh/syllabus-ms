import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { DepartmentResponseDto } from '../../../departments/dto/response/department.response.dto';
import { ReferenceMaterialResponseDto } from '../../../reference-materials/dto/response/reference-material.response.dto';
import { UserResponseDto } from '../../../users/dto/response/user.response.dto';
import { CourseOutcomeStandard } from '../../interface/course-outcome-standard.interface';
import { CourseSchedule } from '../../interface/course-schedule.interface';
import { CourseTimeDistribution } from '../../interface/course-time-distribution.interface';
import { TeachingSchedule } from '../../interface/teaching-schedule.interface';
import { CourseType, SyllabusStatusEnum } from '../../syllabuses.constants';
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
  id: string;

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
  prerequisiteCourses: SyllabusResponseDto[];

  @ApiProperty()
  @Expose()
  courseType: CourseType;

  @ApiProperty()
  @Expose()
  @Type(() => DepartmentResponseDto)
  department: DepartmentResponseDto;

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
  @Type(() => CourseTestScheduleDto)
  midtermAssessmentSchedule: CourseTestScheduleDto[];

  @ApiProperty()
  @Expose()
  finalAssessmentSchedule: CourseTestScheduleDto;

  @ApiProperty()
  @Expose()
  status: SyllabusStatusEnum;
}
