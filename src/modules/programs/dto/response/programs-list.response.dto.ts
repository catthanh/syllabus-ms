import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProgramItemResponseDto {
  @ApiProperty()
  @Expose()
  programCode: string;

  @ApiProperty()
  @Expose()
  vietnameseName: string;
}
