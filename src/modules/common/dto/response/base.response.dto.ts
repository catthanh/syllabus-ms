import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IBaseResponseDto } from '../../interface/base.response.dto.interface';

export class ResponseDto<T> implements IBaseResponseDto {
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

  @ApiPropertyOptional({
    description: 'Data',
  })
  @Expose()
  data?: T;
}
