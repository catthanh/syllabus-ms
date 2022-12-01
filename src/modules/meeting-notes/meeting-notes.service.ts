import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/request/pagination-query.request.dto';
import { CreateMeetingNotesRequestDto } from './dto/request/create-meeting-notes.request.dto';
import { UpdateMeetingNoteBody } from './dto/request/update-meeting-note.request.dto';
import { MeetingNoteEntity } from './meeting-note.entity';

@Injectable()
export class MeetingNotesService {
  constructor(
    @InjectRepository(MeetingNoteEntity)
    private readonly meetingNoteRepository: Repository<MeetingNoteEntity>,
  ) {}

  async create(
    request: CreateMeetingNotesRequestDto,
  ): Promise<MeetingNoteEntity> {
    const meetingNote = this.meetingNoteRepository.create(request);
    return this.meetingNoteRepository.save(meetingNote);
  }

  async update(
    id: number,
    request: UpdateMeetingNoteBody,
  ): Promise<MeetingNoteEntity> {
    const meetingNote = await this.meetingNoteRepository.findOne({
      where: { id },
    });
    if (!meetingNote) {
      throw new NotFoundException('Meeting note not found');
    }
    return this.meetingNoteRepository.save({
      ...meetingNote,
      ...request,
    });
  }

  async get(id: number): Promise<MeetingNoteEntity> {
    const meetingNote = await this.meetingNoteRepository.findOne({
      where: { id },
    });
    if (!meetingNote) {
      throw new NotFoundException('Meeting note not found');
    }
    return meetingNote;
  }

  async delete(id: number): Promise<void> {
    const meetingNote = await this.meetingNoteRepository.findOne({
      where: { id },
    });
    if (!meetingNote) {
      throw new NotFoundException('Meeting note not found');
    }
    await this.meetingNoteRepository.remove(meetingNote);
  }

  /**
   *
   * @param request
   * @returns [data , page, limit, total]
   */
  async getList(
    request: PaginationQueryDto,
  ): Promise<[MeetingNoteEntity[], number, number, number]> {
    const { page, limit, search, sort, filter } = request;

    const queryBuilder =
      this.meetingNoteRepository.createQueryBuilder('meetingNote');
    if (search) {
      queryBuilder.where(
        new Brackets((qb) => {
          qb.where('meetingNote.title ILIKE :search', {
            search: `%${search}%`,
          }).orWhere('meetingNote.content ILIKE :search', {
            search: `%${search}%`,
          });
        }),
      );
    }

    if (limit) {
      queryBuilder.limit(limit);
    }

    if (page) {
      queryBuilder.offset((page - 1) * limit);
    }
    const [data, total] = await queryBuilder.getManyAndCount();
    return [data, page, limit, total];
  }
}
