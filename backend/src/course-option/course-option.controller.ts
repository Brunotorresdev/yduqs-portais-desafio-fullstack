import { Controller, Get } from '@nestjs/common';
import { CourseOptionService } from './course-option.service';
import { CourseOptionDto } from './dto/course-option.dto';
import { ApiExtraModels, ApiOkResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto } from '../common/dto/api-response.dto';

@ApiTags('course-options')
@Controller('course-options')
@ApiExtraModels(ApiResponseDto, CourseOptionDto)
export class CourseOptionController {
  constructor(private readonly courseOptionService: CourseOptionService) {}

  @Get()
  @ApiOkResponse({
    schema: {
      allOf: [{ $ref: getSchemaPath(ApiResponseDto) }, { properties: { data: { type: 'array', items: { $ref: getSchemaPath(CourseOptionDto) } } } }],
    },
  })
  findAll(): Promise<ApiResponseDto<CourseOptionDto[]>> {
    return this.courseOptionService.findAll();
  }
}