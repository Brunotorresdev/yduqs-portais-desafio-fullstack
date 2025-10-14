import { Module } from '@nestjs/common';
import { CourseOptionService } from './course-option.service';
import { CourseOptionController } from './course-option.controller';
import { PrismaModule } from '../database/prisma.module';
import { InstallmentService } from '../common/services/installment.service';

@Module({
  imports: [PrismaModule],
  controllers: [CourseOptionController],
  providers: [CourseOptionService, InstallmentService],
  exports: [InstallmentService],
})
export class CourseOptionModule {}
