import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ example: 'Fulano de Tal' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '12345678901' })
  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  identifier: string; // CPF or CNPJ

  @ApiProperty({ example: '1990-01-01T00:00:00.000Z' })
  @IsNotEmpty()
  birth_date: Date;

  @ApiProperty({ example: 'fulano@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '21999998888' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 2008 })
  @IsInt()
  high_school_completion_year: number;
}