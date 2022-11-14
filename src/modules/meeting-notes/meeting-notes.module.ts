import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingNoteEntity } from './meeting-note.entity';
import { MeetingNotesController } from './meeting-notes.controller';
import { MeetingNotesService } from './meeting-notes.service';

@Module({
  imports: [TypeOrmModule.forFeature([MeetingNoteEntity])],
  controllers: [MeetingNotesController],
  providers: [MeetingNotesService],
})
export class MeetingNotesModule {}
