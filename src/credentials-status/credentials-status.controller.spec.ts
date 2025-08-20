import { Test, TestingModule } from '@nestjs/testing';
import { CredentialsStatusController } from './credentials-status.controller';
import { CredentialsStatusService } from './credentials-status.service';

describe('CredentialsStatusController', () => {
  let controller: CredentialsStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CredentialsStatusController],
      providers: [CredentialsStatusService],
    }).compile();

    controller = module.get<CredentialsStatusController>(CredentialsStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
