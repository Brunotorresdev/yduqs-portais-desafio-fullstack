import { Test, TestingModule } from '@nestjs/testing';
import { ValidationService } from './validation.service';
import { BadRequestException } from '@nestjs/common';

describe('ValidationService', () => {
  let service: ValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidationService],
    }).compile();

    service = module.get<ValidationService>(ValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateBirthDate', () => {
    it('should validate a valid birth date', () => {
      const validDate = '1990-01-01T00:00:00.000Z';
      expect(() => service.validateBirthDate(validDate)).not.toThrow();
    });

    it('should throw error for future birth date', () => {
      const futureDate = '2030-01-01T00:00:00.000Z';
      expect(() => service.validateBirthDate(futureDate)).toThrow(BadRequestException);
    });

    it('should throw error for invalid date format', () => {
      const invalidDate = 'invalid-date';
      expect(() => service.validateBirthDate(invalidDate)).toThrow(BadRequestException);
    });

    it('should throw error for age below minimum', () => {
      const youngDate = new Date();
      youngDate.setFullYear(youngDate.getFullYear() - 10); // 10 years old
      expect(() => service.validateBirthDate(youngDate.toISOString())).toThrow(BadRequestException);
    });

    it('should throw error for age above maximum', () => {
      const oldDate = new Date();
      oldDate.setFullYear(oldDate.getFullYear() - 130); // 130 years old
      expect(() => service.validateBirthDate(oldDate.toISOString())).toThrow(BadRequestException);
    });
  });

  describe('validateGraduationYear', () => {
    it('should validate a valid graduation year', () => {
      expect(() => service.validateGraduationYear(2020)).not.toThrow();
    });

    it('should throw error for future year', () => {
      const futureYear = new Date().getFullYear() + 1;
      expect(() => service.validateGraduationYear(futureYear)).toThrow(BadRequestException);
    });

    it('should throw error for very old year', () => {
      expect(() => service.validateGraduationYear(1940)).toThrow(BadRequestException);
    });
  });

  describe('validateCPFFormat', () => {
    it('should validate a valid CPF format', () => {
      expect(() => service.validateCPFFormat('12345678901')).not.toThrow();
    });

    it('should throw error for CPF with wrong length', () => {
      expect(() => service.validateCPFFormat('123456789')).toThrow(BadRequestException);
    });

    it('should throw error for CPF with all same digits', () => {
      expect(() => service.validateCPFFormat('11111111111')).toThrow(BadRequestException);
    });
  });

  describe('validatePhoneFormat', () => {
    it('should validate a valid phone format', () => {
      expect(() => service.validatePhoneFormat('21999998888')).not.toThrow();
    });

    it('should throw error for phone with wrong length', () => {
      expect(() => service.validatePhoneFormat('123456789')).toThrow(BadRequestException);
    });
  });

  describe('validateName', () => {
    it('should validate a valid name', () => {
      expect(() => service.validateName('João Silva')).not.toThrow();
    });

    it('should throw error for name too short', () => {
      expect(() => service.validateName('A')).toThrow(BadRequestException);
    });

    it('should throw error for name too long', () => {
      const longName = 'A'.repeat(101);
      expect(() => service.validateName(longName)).toThrow(BadRequestException);
    });
  });

  describe('validateInstallmentCount', () => {
    it('should validate a valid installment count', () => {
      expect(() => service.validateInstallmentCount(12)).not.toThrow();
    });

    it('should throw error for installment count too low', () => {
      expect(() => service.validateInstallmentCount(0)).toThrow(BadRequestException);
    });

    it('should throw error for installment count too high', () => {
      expect(() => service.validateInstallmentCount(25)).toThrow(BadRequestException);
    });
  });

  describe('validateClientData', () => {
    it('should validate valid client data', () => {
      const validClientData = {
        name: 'João Silva',
        identifier: '12345678901',
        birth_date: '1990-01-01T00:00:00.000Z',
        phone: '21999998888',
        high_school_completion_year: 2008,
      };
      expect(() => service.validateClientData(validClientData)).not.toThrow();
    });

    it('should throw error for invalid client data', () => {
      const invalidClientData = {
        name: 'A',
        identifier: '123',
        birth_date: '2030-01-01T00:00:00.000Z',
        phone: '123',
        high_school_completion_year: 2030,
      };
      expect(() => service.validateClientData(invalidClientData)).toThrow(BadRequestException);
    });
  });

  describe('validatePurchaseData', () => {
    it('should validate valid purchase data', () => {
      const validPurchaseData = {
        total_installments: 12,
        total_value: 1200,
        installment_value: 100,
        accepted_terms: true,
      };
      expect(() => service.validatePurchaseData(validPurchaseData)).not.toThrow();
    });

    it('should throw error when terms not accepted', () => {
      const invalidPurchaseData = {
        accepted_terms: false,
      };
      expect(() => service.validatePurchaseData(invalidPurchaseData)).toThrow(BadRequestException);
    });
  });
});
