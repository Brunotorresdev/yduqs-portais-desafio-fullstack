import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseOptionModule } from './course-option/course-option.module';
import { PrismaModule } from './database/prisma.module';
import { ClientModule } from './client/client.module';
import { PurchaseModule } from './purchase/purchase.module';

@Module({
  imports: [CourseOptionModule, PrismaModule, ClientModule, PurchaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
