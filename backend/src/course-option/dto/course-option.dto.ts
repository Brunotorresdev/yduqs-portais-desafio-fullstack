import { ApiProperty } from '@nestjs/swagger';

class TournDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class CourseOptionDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ required: false, nullable: true })
  name: string | null;

  @ApiProperty({ type: 'number', required: false, nullable: true })
  value: number | null;

  @ApiProperty({ type: 'number', required: false, nullable: true })
  cash_value: number | null;

  @ApiProperty()
  city: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  street_number: string;

  @ApiProperty()
  street_neighborhood: string;

  @ApiProperty()
  is_default: boolean;

  @ApiProperty({ type: () => [TournDto] })
  tourns: TournDto[];
}