import { Test, TestingModule } from '@nestjs/testing';
import { MeetingNotesController } from './meeting-notes.controller';

describe('MeetingNotesController', () => {
  let controller: MeetingNotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeetingNotesController],
    }).compile();

    controller = module.get<MeetingNotesController>(MeetingNotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
