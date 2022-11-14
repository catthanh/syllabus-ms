import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramEntity } from './program.entity';
import { MajorEntity } from '../majors/major.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramEntity, MajorEntity])],
  providers: [ProgramsService],
  controllers: [ProgramsController],
})
export class ProgramModule {}
