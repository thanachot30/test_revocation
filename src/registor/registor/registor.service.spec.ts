import { Test, TestingModule } from '@nestjs/testing';
import { RegistorService } from './registor.service';

describe('RegistorService', () => {
  let service: RegistorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistorService],
    }).compile();

    service = module.get<RegistorService>(RegistorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
