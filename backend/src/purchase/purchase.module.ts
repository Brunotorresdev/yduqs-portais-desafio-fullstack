import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { PrismaModule } from '../database/prisma.module';
import { ClientModule } from '../client/client.module';
import { ValidationService } from '../common/services/validation.service';
import { InstallmentService } from '../common/services/installment.service';

@Module({
  imports: [PrismaModule, ClientModule],
  controllers: [PurchaseController],
  providers: [PurchaseService, ValidationService, InstallmentService],
})
export class PurchaseModule {}