import { Module } from '@nestjs/common';
import { CourseOptionService } from './course-option.service';
import { CourseOptionController } from './course-option.controller';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CourseOptionController],
  providers: [CourseOptionService],
})
export class CourseOptionModule {}
