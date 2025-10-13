import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { Purchase } from '@prisma/client';

@ApiTags('purchase')
@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Purchase created successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  create(
    @Body(new ValidationPipe({ transform: true })) createPurchaseDto: CreatePurchaseDto,
  ): Promise<ApiResponseDto<Purchase>> {
    return this.purchaseService.create(createPurchaseDto);
  }
}