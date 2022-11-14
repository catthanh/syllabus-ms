import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateMeetingNotesRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  time: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  place: string;
}
