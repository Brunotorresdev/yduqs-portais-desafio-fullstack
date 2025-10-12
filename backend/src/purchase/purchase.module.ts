import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [PrismaModule, ClientModule],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}