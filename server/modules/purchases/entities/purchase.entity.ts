import { Client } from '../../clients/entities/client.entity';
import { CourseOption } from '../../courses/entities/course-option.entity';

export class Purchase {
  id: string;
  client: Client;
  clientId: string;
  courseOption: CourseOption;
  courseOptionId: string;
  totalInstallments: number;
  installmentValue: number;
  totalValue: number;
  createdAt: Date;
}