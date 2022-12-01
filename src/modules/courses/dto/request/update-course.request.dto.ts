import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.request.dto';

export class UpdateCourseBody extends PartialType(CreateCourseDto) {}
