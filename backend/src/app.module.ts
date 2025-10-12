import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseOptionModule } from './course-option/course-option.module';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [CourseOptionModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
