import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ 
    example: 'Fulano de Tal',
    description: 'Nome completo do cliente'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    example: '12345678901',
    description: 'CPF do cliente (apenas números)'
  })
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({ 
    example: '1990-01-01T00:00:00.000Z',
    description: 'Data de nascimento do cliente'
  })
  @IsDateString()
  @IsNotEmpty()
  birth_date: string;

  @ApiProperty({ 
    example: 'fulano@email.com',
    description: 'E-mail válido do cliente'
  })
  @IsEmail()
  email: string;

  @ApiProperty({ 
    example: '21999998888',
    description: 'Telefone do cliente'
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ 
    example: 2008,
    description: 'Ano de conclusão do ensino médio'
  })
  @IsInt()
  high_school_completion_year: number;
}