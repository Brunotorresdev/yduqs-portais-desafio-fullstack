import { Test, TestingModule } from '@nestjs/testing';
import { InstallmentService } from './installment.service';

describe('InstallmentService', () => {
  let service: InstallmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstallmentService],
    }).compile();

    service = module.get<InstallmentService>(InstallmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculateInstallments', () => {
    it('should calculate installments correctly', () => {
      const baseValue = 1000;
      const installments = service.calculateInstallments(baseValue);

      expect(installments).toHaveLength(7);
      expect(installments[0]).toEqual({
        parcels: 1,
        installment: 1000,
        total: 1000,
      });
      expect(installments[1]).toEqual({
        parcels: 3,
        installment: 343.33,
        total: 1030,
      });
    });

    it('should handle zero value', () => {
      const installments = service.calculateInstallments(0);
      expect(installments[0].total).toBe(0);
    });
  });

  describe('validateInstallmentValues', () => {
    it('should validate correct installment values', () => {
      const isValid = service.validateInstallmentValues(12, 100, 1200);
      expect(isValid).toBe(true);
    });

    it('should validate with small tolerance for rounding', () => {
      const isValid = service.validateInstallmentValues(3, 333.33, 1000);
      expect(isValid).toBe(true);
    });

    it('should return true for optional values', () => {
      const isValid = service.validateInstallmentValues(undefined as any, undefined as any, undefined as any);
      expect(isValid).toBe(true);
    });

    it('should return false for inconsistent values', () => {
      const isValid = service.validateInstallmentValues(12, 100, 1000);
      expect(isValid).toBe(false);
    });
  });
});
