import { Injectable } from '@nestjs/common';

export interface InstallmentOption {
  parcels: number;
  installment: number;
  total: number;
}

@Injectable()
export class InstallmentService {
  /**
   * Calcula as opções de parcelamento baseado no valor do curso
   */
  calculateInstallments(baseValue: number): InstallmentOption[] {
    const interestRates = {
      1: 0,      // À vista - sem juros
      3: 0.03,   // 3 parcelas - 3% de juros
      6: 0.07,   // 6 parcelas - 7% de juros
      9: 0.10,   // 9 parcelas - 10% de juros
      12: 0.13,  // 12 parcelas - 13% de juros
      15: 0.15,  // 15 parcelas - 15% de juros
      18: 0.17,  // 18 parcelas - 17% de juros
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

  /**
   * Valida se os valores de parcelamento são consistentes
   */
  validateInstallmentValues(
    totalInstallments: number,
    installmentValue: number,
    totalValue: number,
  ): boolean {
    if (!totalInstallments || !installmentValue || !totalValue) {
      return true; // Valores opcionais
    }

    const calculatedTotal = installmentValue * totalInstallments;
    const tolerance = 0.01; // Tolerância de 1 centavo para arredondamentos

    return Math.abs(calculatedTotal - totalValue) <= tolerance;
  }
}
