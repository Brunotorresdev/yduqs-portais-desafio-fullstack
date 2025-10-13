import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CourseOptionDto } from './dto/course-option.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';

@Injectable()
export class CourseOptionService {
  constructor(private prisma: PrismaService) {}

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

    const data = courseOptions.map((option) => ({
      ...option,
      value: option.value ? parseFloat(option.value.toString()) : null,
      cash_value: option.cash_value
        ? parseFloat(option.cash_value.toString())
        : null,
      tourns: option.tourns.map((t) => t.tourn),
      installments: [
        { parcels: 1, installment: 2613.6, total: 2613.6 },
        { parcels: 3, installment: 900.9, total: 2702.7 },
        { parcels: 6, installment: 465.3, total: 2791.8 },
        { parcels: 9, installment: 320.1, total: 2880.9 },
        { parcels: 12, installment: 247.5, total: 2946.0 },
        { parcels: 15, installment: 200.97, total: 3014.55 },
        { parcels: 18, installment: 169.95, total: 3059.1 },
      ],
    }));

    return {
      data,
      errorMessages: [],
    };
  }
}
