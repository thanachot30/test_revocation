import { Test, TestingModule } from '@nestjs/testing';
import { CredentialsStatusService } from './credentials-status.service';

describe('CredentialsStatusService', () => {
  let service: CredentialsStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CredentialsStatusService],
    }).compile();

    service = module.get<CredentialsStatusService>(CredentialsStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
