import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { DepartmentResponseDto } from '../../../departments/dto/response/department.response.dto';

export class MajorResponseDto {
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
  @Type(() => DepartmentResponseDto)
  department: DepartmentResponseDto;

  // @ApiProperty()
  // @Expose()
  // @Type(() => ProgramResponseDto)
  // programs: ProgramResponseDto[];

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
