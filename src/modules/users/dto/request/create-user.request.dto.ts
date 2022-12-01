import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsString,
  ValidateNested,
} from 'class-validator';
import { RoleEnum } from '../../role.enum';

export class UserToDepartments {
  @ApiProperty()
  @IsEnum(RoleEnum)
  @Expose()
  role: RoleEnum;

  @ApiProperty()
  @IsInt()
  @Expose()
  departmentId: number;
}
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserToDepartments)
  userToDepartments: UserToDepartments[];
}
