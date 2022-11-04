import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferenceMaterialsEntity } from '../reference-materials/reference-materials.entity';
import { UserEntity } from '../users/entities/user.entity';
import { SyllabusEntity } from './entities/syllabus.entity';
import { SyllabusesController } from './syllabuses.controller';
import { SyllabusesService } from './syllabuses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SyllabusEntity,
      ReferenceMaterialsEntity,
      UserEntity,
    ]),
  ],
  providers: [SyllabusesService],
  exports: [],
  controllers: [SyllabusesController],
})
export class SyllabusesModule {}
