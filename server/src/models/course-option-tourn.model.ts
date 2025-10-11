import { CourseOption } from './course-option.model';
import { Tourn } from './tourn.model';

export class CourseOptionTourn {
  id: string;
  courseOption: CourseOption;
  courseOptionId: string;
  tourn: Tourn;
  tournId: string;
}