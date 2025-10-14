import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CourseOptionDto } from './dto/course-option.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { InstallmentService } from '../common/services/installment.service';

@Injectable()
export class CourseOptionService {
  constructor(
    private prisma: PrismaService,
    private installmentService: InstallmentService,
  ) {}

  async findAll(): Promise<ApiResponseDto<CourseOptionDto[]>> {
    const courseOptions = await this.prisma.courseOption.findMany({
      include: {
        tourns: {
          select: {
            tourn: true,
          },
        },
      },
    });

    const data = courseOptions.map((option) => {
      const baseValue = option.cash_value ? parseFloat(option.cash_value.toString()) : 0;
      const installments = this.installmentService.calculateInstallments(baseValue);
      
      return {
        ...option,
        value: baseValue,
        cash_value: option.cash_value
          ? parseFloat(option.cash_value.toString())
          : null,
        tourns: option.tourns.map((t) => t.tourn),
        installments,
      };
    });

    return {
      data,
      errorMessages: [],
    };
  }
}
