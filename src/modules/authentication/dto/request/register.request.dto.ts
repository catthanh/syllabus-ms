import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty({
    example: '19020443',
  })
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;
}
