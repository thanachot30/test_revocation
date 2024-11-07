import { Test, TestingModule } from '@nestjs/testing';
import { RegistorController } from './registor.controller';

describe('RegistorController', () => {
  let controller: RegistorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistorController],
    }).compile();

    controller = module.get<RegistorController>(RegistorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
