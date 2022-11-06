import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IBaseResponseDto } from '../../interface/base.response.dto.interface';

export class PaginationResponseDto<T> implements IBaseResponseDto {
  @ApiProperty({
    description: 'Status code',
    example: 200,
    type: Number,
  })
  @Expose()
  statusCode: number;

  @ApiPropertyOptional({
    description: 'Message',
  })
  @Expose()
  message: string;

  @ApiProperty()
  @Expose()
  data: T[];

  @ApiProperty()
  @Expose()
  page: number;

  @ApiProperty()
  @Expose()
  limit: number;

  @ApiProperty()
  @Expose()
  total: number;
}
