import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateClientDto } from '../../client/dto/create-client.dto';

export class CreatePurchaseDto {
  @ApiProperty({
    description: 'ID of the chosen course option',
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  })
  @IsUUID()
  course_option_id: string;

  @ApiProperty({ example: 12 })
  @IsInt()
  @IsOptional()
  total_installments: number;

  @ApiProperty({ type: () => CreateClientDto })
  @ValidateNested()
  @Type(() => CreateClientDto)
  client: CreateClientDto;

  @ApiProperty({ example: true })
  @IsBoolean()
  accepted_terms: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  accepted_whatsapp_updates: boolean;

  @ApiProperty({ example: 1200.5 })
  @IsOptional()
  total_value: number;

  @ApiProperty({ example: 100.25 })
  @IsOptional()
  installment_value: number;
}
