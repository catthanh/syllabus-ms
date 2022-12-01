import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ChangePasswordRequestDto {
  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsString()
  newPassword: string;
}
