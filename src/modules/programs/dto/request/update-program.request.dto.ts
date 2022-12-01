import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramRequestDto } from './create-program.request.dto';

export class UpdateProgramBody extends PartialType(CreateProgramRequestDto) {}
