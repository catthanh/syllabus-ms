import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsNumber, Min, Max, IsArray } from 'class-validator';

export class SortQueryDto {
  @ApiPropertyOptional({
    description: 'Sort by field',
    example: 'id',
  })
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  sortBy: string;

  @ApiPropertyOptional({
    description: 'Sort direction',
    example: 'ASC',
  })
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  sortDirection: 'ASC' | 'DESC';
}

export class FilterQueryDto {
  @ApiPropertyOptional({
    description: 'Filter by field',
    example: 'id',
  })
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  filterBy: string;

  @ApiPropertyOptional({
    description: 'Filter value',
    example: '1',
  })
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  filterValue: string;
}

export class PaginationQueryDto {
  @ApiPropertyOptional({
    type: Number,
    description: 'Số lượng bản ghi trên một trang',
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => parseInt(value))
  limit?: number;

  @ApiPropertyOptional({
    type: Number,
    description: 'Số thứ tự trang',
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page?: number;

  @ApiPropertyOptional({
    type: [SortQueryDto],
    description: 'Sắp xếp bởi',
  })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return JSON.parse(value);
    }
    return value;
  })
  @IsOptional()
  @IsArray()
  sort?: SortQueryDto[];

  @ApiPropertyOptional({
    type: 'object',
    description: 'Lọc bởi',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return JSON.parse(value);
    }
    return value;
  })
  filter?: FilterQueryDto;

  @ApiPropertyOptional({
    type: [String],
    description: 'Lấy các trường',
  })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',');
    }
    return value;
  })
  @IsOptional()
  select?: string[];

  @ApiPropertyOptional({
    type: 'string',
    description: 'Tìm kiếm bởi',
  })
  @IsOptional()
  search?: string;
}
