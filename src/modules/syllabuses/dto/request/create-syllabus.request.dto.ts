import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateReferenceMaterialDto } from '../../../reference-materials/dto/request/create-reference-material.dto';
import { AssessmentForm } from '../../interface/assessment-form.interface';
import { CourseOutcomeStandard } from '../../interface/course-outcome-standard.interface';
import { CourseSchedule } from '../../interface/course-schedule.interface';
import { CourseTestSchedule } from '../../interface/course-test.interface';
import { CourseTimeDistribution } from '../../interface/course-time-distribution.interface';
import { TeachingSchedule } from '../../interface/teaching-schedule.interface';
import {
  AssessmentMethod,
  CourseType,
  TeachingLocationEnum,
  TeachingMethodEnum,
} from '../../syllabuses.constants';

export class CourseOutcomeStandardDto implements CourseOutcomeStandard {
  @ApiProperty()
  @Expose()
  description: string;
  @ApiProperty()
  @Expose()
  level: number;
}

export class TeachingScheduleDto implements TeachingSchedule {
  @ApiProperty({
    enum: TeachingMethodEnum,
  })
  teachingMethod: TeachingMethodEnum;

  @ApiProperty()
  @Expose()
  lessonPerWeek: number;

  @ApiProperty()
  @Expose()
  scope: string;

  @ApiProperty({
    enum: TeachingLocationEnum,
  })
  @Expose()
  location: TeachingLocationEnum;
}

export class CourseScheduleDto implements CourseSchedule {
  @ApiProperty()
  @Expose()
  week: number | number[];
  @ApiProperty()
  @Expose()
  taughtContent: string;
  @ApiProperty()
  @Expose()
  selfStudyContent: string;
}

export class CourseTestScheduleDto implements CourseTestSchedule {
  @ApiProperty()
  @Expose()
  assessmentMethod: AssessmentMethod;
  @ApiProperty()
  @Expose()
  week: number;
}

export class CourseTimeDistributionDto implements CourseTimeDistribution {
  @ApiProperty()
  @Expose()
  theory: number;
  @ApiProperty()
  @Expose()
  practice: number;
  @ApiProperty()
  @Expose()
  selfStudy: number;
}

export class AssessmentFormDto implements AssessmentForm {
  @ApiProperty()
  @Expose()
  assessmentMethod: AssessmentMethod;
  @ApiProperty()
  @Expose()
  goal: string;
  @ApiProperty()
  @Expose()
  weight: number;
}

export class CreateSyllabusRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  primaryLecturerId: number;

  @ApiPropertyOptional()
  @IsArray()
  @IsInt({ each: true })
  otherLecturerIds: number[];

  @ApiProperty()
  @IsNotEmpty()
  courseName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  courseCode: string;

  @ApiProperty()
  @IsNotEmpty()
  courseCredit: number;

  @ApiProperty()
  @IsNotEmpty()
  courseTimeDistribution: CourseTimeDistributionDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  prerequisiteId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(CourseType)
  courseType: CourseType;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  departmentId: number;

  @ApiProperty()
  @IsNotEmpty()
  courseTarget: string;

  @ApiProperty({
    type: [CourseOutcomeStandardDto],
  })
  @IsArray()
  @IsNotEmpty()
  outcomeStandard: CourseOutcomeStandardDto[];

  @ApiProperty()
  @IsString()
  courseSummary: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  courseContent: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  referenceMaterials: CreateReferenceMaterialDto[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  teachingSchedule: TeachingScheduleDto[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  detailedTeachingSchedule: CourseScheduleDto[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  coursePolicy: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  midtermAssessment: AssessmentFormDto[];

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  finalAssessment: AssessmentFormDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  assessmentCriteria: string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  midtermAssessmentSchedule: CourseTestScheduleDto;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  finalAssessmentSchedule: CourseTestScheduleDto;
}
