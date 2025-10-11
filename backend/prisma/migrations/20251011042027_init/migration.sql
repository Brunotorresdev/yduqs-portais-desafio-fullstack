-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "high_school_completion_year" INTEGER NOT NULL,
    "accepted_terms" BOOLEAN NOT NULL,
    "accepted_whatsapp_updates" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseOption" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "value" DECIMAL(65,30),
    "cash_value" DECIMAL(65,30),
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "street_number" TEXT NOT NULL,
    "street_neighborhood" TEXT NOT NULL,
    "is_default" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tourn" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tourn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseOptionTourn" (
    "id" TEXT NOT NULL,
    "course_option_id" TEXT NOT NULL,
    "tourn_id" TEXT NOT NULL,

    CONSTRAINT "CourseOptionTourn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "course_option_id" TEXT NOT NULL,
    "total_installments" INTEGER NOT NULL,
    "installment_value" DECIMAL(65,30) NOT NULL,
    "total_value" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_identifier_key" ON "Client"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CourseOptionTourn_course_option_id_tourn_id_key" ON "CourseOptionTourn"("course_option_id", "tourn_id");

-- AddForeignKey
ALTER TABLE "CourseOptionTourn" ADD CONSTRAINT "CourseOptionTourn_course_option_id_fkey" FOREIGN KEY ("course_option_id") REFERENCES "CourseOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseOptionTourn" ADD CONSTRAINT "CourseOptionTourn_tourn_id_fkey" FOREIGN KEY ("tourn_id") REFERENCES "Tourn"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_course_option_id_fkey" FOREIGN KEY ("course_option_id") REFERENCES "CourseOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
