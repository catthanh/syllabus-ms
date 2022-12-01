import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmentRequestDto } from './create-department.request.dto';

export class UpdateDepartmentBody extends PartialType(
  CreateDepartmentRequestDto,
) {}
