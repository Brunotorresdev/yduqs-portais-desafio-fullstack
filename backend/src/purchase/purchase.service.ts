import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { ClientService } from '../client/client.service';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { Purchase } from '@prisma/client';
import { ValidationService } from '../common/services/validation.service';
import { InstallmentService } from '../common/services/installment.service';

@Injectable()
export class PurchaseService {
  constructor(
    private prisma: PrismaService,
    private clientService: ClientService,
    private validationService: ValidationService,
    private installmentService: InstallmentService,
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
      total_value,
      installment_value,
    } = purchaseData;

    // Buscar e validar opção de curso
    const courseOption = await this.prisma.courseOption.findUnique({
      where: { id: course_option_id },
    });

    if (!courseOption) {
      throw new NotFoundException('Opção de curso não encontrada');
    }

    // Validar dados do cliente
    this.validationService.validateClientData(clientInfo);

    // Validar dados da compra
    this.validationService.validatePurchaseData({
      total_installments,
      total_value,
      installment_value,
      accepted_terms,
    });

    // Validar valores de parcelamento se fornecidos
    if (total_installments && installment_value && total_value) {
      const isValid = this.installmentService.validateInstallmentValues(
        total_installments,
        installment_value,
        total_value,
      );
      
      if (!isValid) {
        throw new BadRequestException('Valores de parcelamento inconsistentes');
      }
    }

    // Criar ou buscar cliente
    const client = await this.clientService.findOrCreate({
      ...clientInfo,
      accepted_terms,
      accepted_whatsapp_updates,
    });

    // Criar compra
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