import { Test, TestingModule } from '@nestjs/testing';
import { ApprovalRequestController } from './approval-request.controller';

describe('ApprovalRequestController', () => {
  let controller: ApprovalRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApprovalRequestController],
    }).compile();

    controller = module.get<ApprovalRequestController>(
      ApprovalRequestController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
