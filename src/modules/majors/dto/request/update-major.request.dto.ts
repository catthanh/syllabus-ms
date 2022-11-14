import { PartialType } from '@nestjs/swagger';
import { CreateMajorRequestDto } from './create-major.request.dto';

export class UpdateMajorRequestDto extends PartialType(CreateMajorRequestDto) {}
