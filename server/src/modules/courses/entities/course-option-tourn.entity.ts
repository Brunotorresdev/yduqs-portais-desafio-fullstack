import { CourseOption } from './course-option.entity';
import { Tourn } from './tourn.entity';

export class CourseOptionTourn {
  id: string;
  courseOption: CourseOption;
  courseOptionId: string;
  tourn: Tourn;
  tournId: string;
}