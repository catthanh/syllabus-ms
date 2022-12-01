import { PartialType } from '@nestjs/mapped-types';
import { CreateMeetingNotesRequestDto } from './create-meeting-notes.request.dto';

export class UpdateMeetingNoteBody extends PartialType(
  CreateMeetingNotesRequestDto,
) {}
