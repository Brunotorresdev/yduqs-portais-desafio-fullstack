import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { ClientService } from 'src/client/client.service';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { Purchase } from '@prisma/client';

@Injectable()
export class PurchaseService {
  constructor(
    private prisma: PrismaService,
    private clientService: ClientService,
  ) {}

  async create(
    purchaseData: CreatePurchaseDto,
  ): Promise<ApiResponseDto<Purchase>> {
    const {
      client: clientInfo,
      course_option_id,
      total_installments,
      accepted_terms,
      accepted_whatsapp_updates,
    } = purchaseData;

    const courseOption = await this.prisma.courseOption.findUnique({
      where: { id: course_option_id },
    });

    if (!courseOption) {
      throw new NotFoundException('Course option not found.');
    }

    if (!courseOption.value) {
      throw new BadRequestException(
        'This course option is not available for purchase.',
      );
    }

    const client = await this.clientService.findOrCreate({
      ...clientInfo,
      accepted_terms,
      accepted_whatsapp_updates,
    });

    const total_value = courseOption.value;
    const installment_value = total_value.toNumber() / total_installments;

    const newPurchase = await this.prisma.purchase.create({
      data: {
        client_id: client.id,
        course_option_id,
        total_installments,
        total_value,
        installment_value,
      },
    });

    return { data: newPurchase, errorMessages: [] };
  }
}