import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { RoleEnum } from '../../role.enum';

export class Department {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;
}
export class UserToDepartments {
  @ApiProperty()
  @Expose()
  role: RoleEnum;

  @ApiProperty()
  @Expose()
  @Type(() => Department)
  department: Department;
}
export class UserResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  username: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  @Type(() => UserToDepartments)
  userToDepartments: UserToDepartments[];

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
