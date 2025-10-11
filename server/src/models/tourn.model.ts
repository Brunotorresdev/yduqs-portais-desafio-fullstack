import { CourseOptionTourn } from './course-option-tourn.model';

export class Tourn {
  id: string;
  name: string;
  courseOptionTourns?: CourseOptionTourn[];
}