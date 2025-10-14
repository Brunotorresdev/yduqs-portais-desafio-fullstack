import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { PrismaModule } from '../database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}