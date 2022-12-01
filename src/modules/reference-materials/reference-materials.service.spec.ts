import { Test, TestingModule } from '@nestjs/testing';
import { ReferenceMaterialsService } from './reference-materials.service';

describe('ReferenceMaterialsService', () => {
  let service: ReferenceMaterialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReferenceMaterialsService],
    }).compile();

    service = module.get<ReferenceMaterialsService>(ReferenceMaterialsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
