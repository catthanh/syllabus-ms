import { PartialType } from '@nestjs/swagger';
import { CreateSyllabusRequestDto } from './create-syllabus.request.dto';

export class UpdateSyllabusDto extends PartialType(CreateSyllabusRequestDto) {}
