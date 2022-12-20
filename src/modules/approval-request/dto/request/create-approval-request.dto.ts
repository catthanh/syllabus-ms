import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsString } from 'class-validator';
import { EntityTypeEnum } from '../../approval-request.enum';

export class CreateApprovalRequestDto {
  @ApiProperty({
    enum: EntityTypeEnum,
  })
  @IsEnum(EntityTypeEnum)
  entityType: EntityTypeEnum;

  @ApiProperty()
  @IsString()
  entityCode: number;
}
