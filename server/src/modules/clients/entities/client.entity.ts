import { Purchase } from '../../purchases/entities/purchase.entity';

export class Client {
  id: string;
  name: string;
  identifier: string;
  birthDate: Date;
  email: string;
  phone: string;
  highSchoolCompletionYear: number;
  acceptedTerms: boolean;
  acceptedWhatsappUpdates: boolean;
  createdAt: Date;
  purchases?: Purchase[];
}