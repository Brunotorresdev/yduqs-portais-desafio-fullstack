import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { ClientService } from '../client/client.service';
import { ValidationService } from '../common/services/validation.service';
import { InstallmentService } from '../common/services/installment.service';
import { PrismaService } from '../database/prisma.service';

describe('PurchaseController', () => {
  let controller: PurchaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseController],
      providers: [
        PurchaseService,
        { provide: PrismaService, useValue: {} },
        { provide: ClientService, useValue: {} },
        { provide: ValidationService, useValue: {} },
        { provide: InstallmentService, useValue: {} },
      ],
    }).compile();

    controller = module.get<PurchaseController>(PurchaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
