import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramEntity } from './program.entity';
import { CourseGroupEntity } from './entities/course-group.entity';
import { SyllabusEntity } from '../syllabuses/entities/syllabus.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProgramEntity,
      CourseGroupEntity,
      SyllabusEntity,
    ]),
  ],
  providers: [ProgramsService],
  controllers: [ProgramsController],
  exports: [ProgramsService],
})
export class ProgramModule {}
