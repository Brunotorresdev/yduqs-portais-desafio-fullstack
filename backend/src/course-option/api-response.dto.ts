import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  data: T;

  @ApiProperty({
    type: [String],
    description: 'A list of error messages.',
    example: [],
  })
  errorMessages: string[];
}