import { Test, TestingModule } from '@nestjs/testing';
import { ApprovalRequestService } from './approval-request.service';

describe('ApprovalRequestService', () => {
  let service: ApprovalRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApprovalRequestService],
    }).compile();

    service = module.get<ApprovalRequestService>(ApprovalRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
