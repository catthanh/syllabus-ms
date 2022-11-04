import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ResponseDto } from './base.response.dto';

export class SuccessResponseDto extends OmitType(ResponseDto<unknown>, [
  'data',
] as const) {
  @ApiProperty()
  @Expose()
  statusCode = 200;

  @ApiProperty()
  @Expose()
  message = 'Thành công';
}
