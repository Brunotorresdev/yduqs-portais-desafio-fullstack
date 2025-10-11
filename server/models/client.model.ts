import { Purchase } from './purchase.model';


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