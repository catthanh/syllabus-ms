import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramEntity } from '../programs/program.entity';
import { ProgramModule } from '../programs/programs.module';
import { SyllabusEntity } from '../syllabuses/entities/syllabus.entity';
import { SyllabusesModule } from '../syllabuses/syllabuses.module';
import { UsersModule } from '../users/users.module';
import { ApprovalRequestController } from './approval-request.controller';
import { ApprovalRequestEntity } from './approval-request.entity';
import { ApprovalRequestService } from './approval-request.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApprovalRequestEntity,
      SyllabusEntity,
      ProgramEntity,
    ]),
    UsersModule,
    ProgramModule,
    SyllabusesModule,
  ],
  controllers: [ApprovalRequestController],
  providers: [ApprovalRequestService],
})
export class ApprovalRequestModule {}
