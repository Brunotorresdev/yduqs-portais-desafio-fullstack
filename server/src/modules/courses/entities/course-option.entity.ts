import { Purchase } from '../../purchases/entities/purchase.entity';
import { CourseOptionTourn } from '../entities/course-option-tourn.entity';

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
  purchases?: Purchase[];
  courseOptionTourns?: CourseOptionTourn[];
}