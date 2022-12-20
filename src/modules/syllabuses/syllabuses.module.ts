import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApprovalRequestEntity } from '../approval-request/approval-request.entity';
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
      ApprovalRequestEntity,
    ]),
  ],
  providers: [SyllabusesService],
  exports: [SyllabusesService],
  controllers: [SyllabusesController],
})
export class SyllabusesModule {}
