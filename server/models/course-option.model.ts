import { CourseOptionTourn } from './course-option-tourn.model';
import { Purchase } from './purchase.model';

export class CourseOption {
  id: string;
  name: string;
  value: number;
  avistaValue: number;
  city: string;
  street: string;
  streetNumber: string;
  streetNeighborhood: string;
  isDefault: boolean;
  createdAt: Date;
  courseOptionTourns?: CourseOptionTourn[];
  purchases?: Purchase[];
}