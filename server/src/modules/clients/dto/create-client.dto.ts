export class CreateClientDto {
  name: string;
  identifier: string;
  birthDate: Date;
  email: string;
  phone: string;
  highSchoolCompletionYear: number;
  acceptedTerms: boolean;
  acceptedWhatsappUpdates: boolean;
}