import { Injectable } from '@nestjs/common';

export interface InstallmentOption {
  parcels: number;
  installment: number;
  total: number;
}

@Injectable()
export class InstallmentService {
 
  calculateInstallments(baseValue: number): InstallmentOption[] {
    const interestRates = {
      1: 0,      
      3: 0.03, 
      6: 0.07, 
      9: 0.10, 
      12: 0.13,
      15: 0.15,
      18: 0.17,
    };

    return Object.entries(interestRates).map(([parcels, rate]) => {
      const total = baseValue * (1 + rate);
      const installment = total / parseInt(parcels);
      
      return {
        parcels: parseInt(parcels),
        installment: Math.round(installment * 100) / 100,
        total: Math.round(total * 100) / 100,
      };
    });
  }

  validateInstallmentValues(
    totalInstallments: number,
    installmentValue: number,
    totalValue: number,
  ): boolean {
    if (!totalInstallments || !installmentValue || !totalValue) {
      return true; 
    }

    const calculatedTotal = installmentValue * totalInstallments;
    const tolerance = 1.00; 

    return Math.abs(calculatedTotal - totalValue) <= tolerance;
  }
}
