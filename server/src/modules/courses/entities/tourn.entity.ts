import { CourseOptionTourn } from '../entities/course-option-tourn.entity';

export class Tourn {
  id: string;
  name: string;
  courseOptionTourns?: CourseOptionTourn[];
}