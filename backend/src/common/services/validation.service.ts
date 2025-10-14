import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidationService {

  validateBirthDate(birthDate: string, minAge: number = 16, maxAge: number = 120): void {
    const birth = new Date(birthDate);
    const today = new Date();
    
    if (isNaN(birth.getTime())) {
      throw new BadRequestException('Data de nascimento inválida');
    }
    
    if (birth > today) {
      throw new BadRequestException('Data de nascimento não pode ser futura');
    }
    
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    let actualAge = age;
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      actualAge = age - 1;
    }
    
    if (actualAge < minAge) {
      throw new BadRequestException(`Idade mínima é ${minAge} anos`);
    }
    
    if (actualAge > maxAge) {
      throw new BadRequestException(`Idade máxima é ${maxAge} anos`);
    }
  }

  validateGraduationYear(year: number): void {
    const currentYear = new Date().getFullYear();
    
    if (year > currentYear) {
      throw new BadRequestException('Ano de conclusão não pode ser futuro');
    }
    
    if (year < 1950) {
      throw new BadRequestException('Ano de conclusão não pode ser anterior a 1950');
    }
  }

  validateCPFFormat(cpf: string): void {
    const cleanCPF = cpf.replace(/\D/g, '');
    
    if (cleanCPF.length !== 11) {
      throw new BadRequestException('CPF deve ter exatamente 11 dígitos numéricos');
    }
    
    if (/^(\d)\1{10}$/.test(cleanCPF)) {
      throw new BadRequestException('CPF inválido');
    }
  }

  validatePhoneFormat(phone: string): void {
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      throw new BadRequestException('Telefone deve ter 10 ou 11 dígitos numéricos');
    }
  }

  validateName(name: string): void {
    if (!name || name.trim().length < 2) {
      throw new BadRequestException('Nome deve ter pelo menos 2 caracteres');
    }
    
    if (name.length > 100) {
      throw new BadRequestException('Nome não pode exceder 100 caracteres');
    }
  }

  validateInstallmentCount(installments: number): void {
    if (installments < 1) {
      throw new BadRequestException('Número de parcelas deve ser pelo menos 1');
    }
    
    if (installments > 24) {
      throw new BadRequestException('Número de parcelas não pode exceder 24');
    }
  }

  validatePositiveValue(value: number, fieldName: string): void {
    if (value <= 0) {
      throw new BadRequestException(`${fieldName} deve ser positivo`);
    }
  }

  validateClientData(clientData: {
    name: string;
    identifier: string;
    birth_date: string;
    phone: string;
    high_school_completion_year: number;
  }): void {
    this.validateName(clientData.name);
    this.validateCPFFormat(clientData.identifier);
    this.validateBirthDate(clientData.birth_date);
    this.validatePhoneFormat(clientData.phone);
    this.validateGraduationYear(clientData.high_school_completion_year);
  }

  validatePurchaseData(purchaseData: {
    total_installments?: number;
    total_value?: number;
    installment_value?: number;
    accepted_terms: boolean;
  }): void {
    if (!purchaseData.accepted_terms) {
      throw new BadRequestException('É necessário aceitar os termos para prosseguir');
    }

    if (purchaseData.total_installments) {
      this.validateInstallmentCount(purchaseData.total_installments);
    }

    if (purchaseData.total_value !== undefined) {
      this.validatePositiveValue(purchaseData.total_value, 'Valor total');
    }

    if (purchaseData.installment_value !== undefined) {
      this.validatePositiveValue(purchaseData.installment_value, 'Valor da parcela');
    }
  }
}
