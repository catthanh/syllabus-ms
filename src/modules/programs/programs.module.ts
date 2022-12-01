import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramEntity } from './entities/programs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramEntity])],
  controllers: [ProgramsController],
  providers: [ProgramsService],
})
export class ProgramsModule {}
