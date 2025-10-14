import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateClientDto } from '../../client/dto/create-client.dto';

export class CreatePurchaseDto {
  @ApiProperty({
    description: 'ID of the chosen course option',
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  })
  @IsUUID('all', { message: 'O ID do curso selecionado não é válido' })
  @IsNotEmpty({ message: 'Por favor, selecione um curso para prosseguir' })
  course_option_id: string;

  @ApiProperty({ 
    example: 12,
    description: 'Número total de parcelas'
  })
  @IsInt()
  @IsOptional()
  total_installments?: number;

  @ApiProperty({ 
    type: () => CreateClientDto,
    description: 'Dados do cliente'
  })
  @ValidateNested()
  @Type(() => CreateClientDto)
  @IsNotEmpty()
  client: CreateClientDto;

  @ApiProperty({ 
    example: true,
    description: 'Confirmação de aceite dos termos'
  })
  @IsBoolean()
  accepted_terms: boolean;

  @ApiProperty({ 
    example: false,
    description: 'Confirmação de recebimento de atualizações via WhatsApp'
  })
  @IsBoolean()
  accepted_whatsapp_updates: boolean;

  @ApiProperty({ 
    example: 1200.5,
    description: 'Valor total da compra'
  })
  @IsOptional()
  @IsNumber()
  total_value?: number;

  @ApiProperty({ 
    example: 100.25,
    description: 'Valor de cada parcela'
  })
  @IsOptional()
  @IsNumber()
  installment_value?: number;
}
