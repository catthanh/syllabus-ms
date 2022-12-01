import { ApiProperty } from '@nestjs/swagger';

export class CreateProgramRequestDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  majorId: number;
}
