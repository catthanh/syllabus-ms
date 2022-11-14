import { Body, Controller, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { PaginationQueryDto } from '../common/dto/request/pagination-query.request.dto';
import {
  PaginationResponseBuilder,
  ResponseBuilder,
} from '../common/util/helper.util';
import { CreateMeetingNotesRequestDto } from './dto/request/create-meeting-notes.request.dto';
import { MeetingNoteResponseDto } from './dto/response/meeting-note.response.dto';
import { MeetingNotesService } from './meeting-notes.service';

@Controller('meeting-notes')
export class MeetingNotesController {
  constructor(private readonly meetingNotesService: MeetingNotesService) {}

  @ApiOperation({
    summary: 'Create meeting note',
    tags: ['Meeting notes'],
  })
  async create(@Body() request: CreateMeetingNotesRequestDto) {
    const data = await this.meetingNotesService.create(request);
    return new ResponseBuilder<MeetingNoteResponseDto>()
      .withCode(HttpStatus.CREATED)
      .withData(data, MeetingNoteResponseDto)
      .withMessage('Meeting note created successfully')
      .build();
  }

  @ApiOperation({
    summary: 'Get meeting note',
    tags: ['Meeting notes'],
  })
  async get(id: number) {
    const data = await this.meetingNotesService.get(id);
    return new ResponseBuilder<MeetingNoteResponseDto>()
      .withData(data, MeetingNoteResponseDto)
      .withMessage('Meeting note fetched successfully')
      .build();
  }

  @ApiOperation({
    summary: 'Update meeting note',
    tags: ['Meeting notes'],
  })
  async update(id: number, @Body() request: CreateMeetingNotesRequestDto) {
    const data = await this.meetingNotesService.update(id, request);
    return new ResponseBuilder<MeetingNoteResponseDto>()
      .withData(data, MeetingNoteResponseDto)
      .withMessage('Meeting note updated successfully')
      .build();
  }

  @ApiOperation({
    summary: 'Delete meeting note',
    tags: ['Meeting notes'],
  })
  async delete(id: number) {
    await this.meetingNotesService.delete(id);
    return new ResponseBuilder()
      .withMessage('Meeting note deleted successfully')
      .build();
  }

  @ApiOperation({
    summary: 'Get meeting notes',
    tags: ['Meeting notes'],
  })
  async getList(@Query() query: PaginationQueryDto) {
    const [data, page, limit, total] = await this.meetingNotesService.getList(
      query,
    );
    return new PaginationResponseBuilder<MeetingNoteResponseDto>()
      .withData(data, MeetingNoteResponseDto)
      .withPage(page)
      .withLimit(limit)
      .withTotal(total)
      .withMessage('Meeting notes fetched successfully')
      .build();
  }
}
