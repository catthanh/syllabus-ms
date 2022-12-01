import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { SyllabusResponseDto } from '../../../syllabuses/dto/response/syllabus.response.dto';

export class CourseResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  code: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  syllabus: SyllabusResponseDto[];

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
