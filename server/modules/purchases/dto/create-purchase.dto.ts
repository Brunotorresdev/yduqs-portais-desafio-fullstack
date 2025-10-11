export class CreatePurchaseDto {
  clientId: string;
  courseOptionId: string;
  totalInstallments: number;
  installmentValue: number;
  totalValue: number;
}