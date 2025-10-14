import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseService } from './purchase.service';
import { PrismaService } from '../database/prisma.service';
import { ClientService } from '../client/client.service';
import { ValidationService } from '../common/services/validation.service';
import { InstallmentService } from '../common/services/installment.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

describe('PurchaseService', () => {
  let service: PurchaseService;
  let prismaService: PrismaService;
  let clientService: ClientService;
  let validationService: ValidationService;
  let installmentService: InstallmentService;

  const mockPrismaService = {
    courseOption: {
      findUnique: jest.fn(),
    },
    purchase: {
      create: jest.fn(),
    },
  };

  const mockClientService = {
    findOrCreate: jest.fn(),
  };

  const mockValidationService = {
    validateClientData: jest.fn(),
    validatePurchaseData: jest.fn(),
  };

  const mockInstallmentService = {
    validateInstallmentValues: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: ClientService, useValue: mockClientService },
        { provide: ValidationService, useValue: mockValidationService },
        { provide: InstallmentService, useValue: mockInstallmentService },
      ],
    }).compile();

    service = module.get<PurchaseService>(PurchaseService);
    prismaService = module.get<PrismaService>(PrismaService);
    clientService = module.get<ClientService>(ClientService);
    validationService = module.get<ValidationService>(ValidationService);
    installmentService = module.get<InstallmentService>(InstallmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const mockPurchaseData: CreatePurchaseDto = {
      course_option_id: 'test-course-id',
      client: {
        name: 'Test User',
        identifier: '12345678901',
        birth_date: '1990-01-01T00:00:00.000Z',
        email: 'test@example.com',
        phone: '21999998888',
        high_school_completion_year: 2008,
      },
      accepted_terms: true,
      accepted_whatsapp_updates: false,
      total_installments: 12,
      total_value: 1200,
      installment_value: 100,
    };

    it('should create a purchase successfully', async () => {
      const mockCourseOption = { id: 'test-course-id', name: 'Test Course' };
      const mockClient = { id: 'test-client-id', name: 'Test User' };
      const mockPurchase = { id: 'test-purchase-id', client_id: 'test-client-id' };

      mockPrismaService.courseOption.findUnique.mockResolvedValue(mockCourseOption);
      mockClientService.findOrCreate.mockResolvedValue(mockClient);
      mockPrismaService.purchase.create.mockResolvedValue(mockPurchase);
      mockInstallmentService.validateInstallmentValues.mockReturnValue(true);

      const result = await service.create(mockPurchaseData);

      expect(result.data).toEqual(mockPurchase);
      expect(mockValidationService.validateClientData).toHaveBeenCalledWith(mockPurchaseData.client);
      expect(mockValidationService.validatePurchaseData).toHaveBeenCalled();
    });

    it('should throw error when terms are not accepted', async () => {
      const purchaseDataWithoutTerms = { ...mockPurchaseData, accepted_terms: false };
      mockPrismaService.courseOption.findUnique.mockResolvedValue({ id: 'test-course-id' });
      mockValidationService.validatePurchaseData.mockImplementation((data) => {
        if (!data.accepted_terms) {
          throw new BadRequestException('É necessário aceitar os termos para prosseguir');
        }
      });

      await expect(service.create(purchaseDataWithoutTerms)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw error when course option is not found', async () => {
      mockPrismaService.courseOption.findUnique.mockResolvedValue(null);

      await expect(service.create(mockPurchaseData)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw error when installment values are inconsistent', async () => {
      const mockCourseOption = { id: 'test-course-id', name: 'Test Course' };
      
      mockPrismaService.courseOption.findUnique.mockResolvedValue(mockCourseOption);
      mockInstallmentService.validateInstallmentValues.mockReturnValue(false);

      await expect(service.create(mockPurchaseData)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});