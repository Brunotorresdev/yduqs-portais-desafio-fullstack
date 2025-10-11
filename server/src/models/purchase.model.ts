import { Client } from './client.model';
import { CourseOption } from './course-option.model';

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