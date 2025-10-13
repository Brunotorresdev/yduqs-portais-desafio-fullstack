-- AlterTable
ALTER TABLE "Purchase" ALTER COLUMN "total_installments" DROP NOT NULL,
ALTER COLUMN "installment_value" DROP NOT NULL,
ALTER COLUMN "total_value" DROP NOT NULL;
