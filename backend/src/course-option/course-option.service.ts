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
    }));

    return {
      data,
      errorMessages: [],
    };
  }
}