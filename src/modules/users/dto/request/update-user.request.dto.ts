import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.request.dto';

export class UpdateUserRequestDto extends PartialType(CreateUserDto) {}
